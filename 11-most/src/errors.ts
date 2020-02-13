

import {  map, filter, fromPromise, runEffects, tap } from "@most/core";
import { Scheduler, Stream } from "@most/types";
import { newDefaultScheduler, currentTime } from "@most/scheduler";
import { createAdapter, } from "@most/adapter";

const scheduler = newDefaultScheduler();
const [pushEvent, events$] = createAdapter();


const logged$ = tap(event => console.log('logged', event), events$);

runEffects(logged$, scheduler);

pushEvent(new Error("wat"))
pushEvent(new Error("wat"))
pushEvent(new Error("wat"))
pushEvent(new Error("wat"))