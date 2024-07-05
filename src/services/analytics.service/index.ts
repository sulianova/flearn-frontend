import { type AnalyticsCallOptions } from 'firebase/analytics';

import { envService } from 'services/env.service';
import { firebaseService } from 'services/firebase.service';
import { EAnalyticsEvent, type TAnalyticsEvents } from './types';

export * from './types';

class AnalyticsService {
    event = EAnalyticsEvent;

    logEvent(event: TAnalyticsEvents, options?: AnalyticsCallOptions) {
        const eventWithEnv = { ...event, data: { ...event.data, env: envService.env } };
        // tslint:disable-next-line
        console.log('logEvent', eventWithEnv);
        if (envService.env === 'prod') {
            firebaseService.logEvent(eventWithEnv.type, eventWithEnv.data, options);
        }
    }
}

export const analyticsService = new AnalyticsService();
