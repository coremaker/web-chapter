import { Notification } from './types';

type CustomEventType = CustomEvent<Notification>;

interface CustomEventMap {
    'emit-core-notification': CustomEventType;
}

declare global {
    interface Document {
        addEventListener<K extends keyof CustomEventMap>(
            type: K,
            listener: (ev: CustomEventMap[K]) => void,
            options?: boolean | AddEventListenerOptions
        ): void;
        removeEventListener<K extends keyof CustomEventMap>(
            type: K,
            listener: (ev: CustomEventMap[K]) => void,
            options?: boolean | EventListenerOptions
        ): void;
        dispatchEvent<K extends keyof CustomEventMap>(event: CustomEventMap[K]): boolean;
    }
}

export {};
