import {config} from '../../config';

import { TCPClient, EventFactory} from 'geteventstore-promise';

/**
 * @class EventStore
 * @description EventStore.org
 */
export class EventStoreProvider {
  [x: string]: any;

  private readonly type: string
  private readonly eventFactory: EventFactory
  public client: TCPClient

  /**
   * @constructor
   */
  constructor() {
    this.type = 'event-store';
    this.eventFactory = new EventFactory();
  }

  connect(config) {
    this.client = new TCPClient(config);
    return this;
  }

  getClient() {
    return this.client;
  }

  publish(event: {eventType: string, data: object, metadata: object, eventId: string}) {
    return this.eventFactory.newEvent(event.eventType, event.data, event.metadata, event.eventId);
  }

  close() {
    this.client.close();
    return this;
  }
}

export const eventStoreProviders = [
  {
    provide: 'EVENT_STORE_PROVIDER',
    useFactory: (
        eventStoreConfig?: any,
    ): any => {
        if (eventStoreConfig === 'EVENT_STORE_CONFIG_USE_ENV') {
          return new EventStoreProvider();
        }
    },
    inject: ['EVENT_STORE_CONFIG'],
  },
];
