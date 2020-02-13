import { Injectable, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IEventPublisher } from '@nestjs/cqrs/dist/interfaces/events/event-publisher.interface';
import { IMessageSource } from '@nestjs/cqrs/dist/interfaces/events/message-source.interface';
import { IEvent } from '@nestjs/cqrs/dist/interfaces/events/event.interface';
import { Subject, fromEvent } from 'rxjs';
import * as xml2js from 'xml2js';
import * as http from 'http';
import { config } from '../../config';
import { EventStoreProvider } from './event-store.provider'

const eventStoreHostUrl = config.EVENT_STORE_SETTINGS.protocol +
  `://${config.EVENT_STORE_SETTINGS.hostname}:${config.EVENT_STORE_SETTINGS.httpPort}/streams/`;

/**
 * @class EventStore
 * @description The EventStore.org bridge. By design, the domain category
 * (i.e. user) events are being subscribed to. Upon events being received,
 * internal event handlers are responsible for the handling of events.
 */
@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {
  private eventStore: EventStoreProvider;
  private eventHandlers: object;
  private category: string;

  constructor(@Inject('EVENT_STORE_PROVIDER') eventStore: EventStoreProvider) {
    this.category = 'bongs';
    this.eventStore = eventStore;
    this.eventStore.connect({
      hostname: config.EVENT_STORE_SETTINGS.hostname,
      port: config.EVENT_STORE_SETTINGS.tcpPort,
      credentials: config.EVENT_STORE_SETTINGS.credentials,
      poolOptions: config.EVENT_STORE_SETTINGS.poolOptions,
    });
  }

  async publish<T extends IEvent>(event: T) {
    const streamName = `${this.category}`;
    const type = event.constructor.name;
    try {
      await this.eventStore.client.writeEvent(streamName, type, event);
    } catch (err) {
      console.trace(err);
    }
  }

  async replay<T extends IEvent>(subject: Subject<T>) {
    const streamName = `${this.category}`;
    const stream = await this.eventStore.client.readEventsForward(streamName);
    for(const event of stream.events) {
      await this.eventStore.client.writeEvent(streamName, event.eventType, event.data);
    }
  }

  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    const streamName = `${this.category}`;

    const onEvent = async (event) => {
      event = this.eventHandlers[event.eventType](...Object.values(event.data));
      subject.next(event);
    };

    const onDropped = (subscription, reason, error) => {
      console.trace(subscription, reason, error);
    };

    try {
      await this.eventStore.client.subscribeToStream(streamName, onEvent, onDropped, false);
    } catch (err) {
      console.trace(err);
    }
  }

  setEventHandlers(eventHandlers) {
    this.eventHandlers = eventHandlers;
  }
}
