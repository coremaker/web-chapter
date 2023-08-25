import { ComponentType, useEffect, useState } from 'react';
import { Notification } from './types';

const NOTIFICATION_EVENT = 'emit-core-notification';
const DEFAULT_CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const DEFAULT_MAX_NOTIFICATIONS = 5;

export const notify = (props: Omit<Notification, 'id' | 'createdAt'>) => {
    const id = window.crypto.randomUUID();
    const createdAt = new Date();
    const event = new CustomEvent(NOTIFICATION_EVENT, {
        detail: { id, open: true, createdAt, ...props },
    });
    document.dispatchEvent(event);
};

type SnackbarComponentProps = Notification & {
    onClose: (id: string) => void;
};

type NotificationCenterProps = {
    maxNotifications?: number;
    hideAfter?: number;
    SnackbarComponent: ComponentType<SnackbarComponentProps>;
    cacheTimeout?: number;
    className?: string;
};

const NotificationCenter = ({
    SnackbarComponent,
    hideAfter = 0,
    cacheTimeout = DEFAULT_CACHE_TIMEOUT,
    maxNotifications = DEFAULT_MAX_NOTIFICATIONS,
    className,
}: NotificationCenterProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const handleCloseNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) => (notification.id === id ? { ...notification, open: false } : notification))
        );
    };

    const listener = (e: CustomEvent) => {
        const newNotification = e.detail;
        setNotifications((prev) => [...prev, newNotification]);

        if (hideAfter) {
            setTimeout(() => {
                handleCloseNotification(newNotification.id);
            }, hideAfter);
        }
    };

    useEffect(() => {
        document.addEventListener(NOTIFICATION_EVENT, listener);

        return () => {
            document.removeEventListener(NOTIFICATION_EVENT, listener);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const validNotifications = notifications.filter(
                (notification) => now - notification.createdAt.getTime() < cacheTimeout
            );
            setNotifications(validNotifications);
        }, cacheTimeout);

        return () => {
            clearInterval(interval);
        };
    }, [cacheTimeout]);

    if (notifications.length < 1) return null;

    return (
        <div className={className} data-testid="notification-center">
            {notifications.slice(-maxNotifications).map((notification) => (
                <SnackbarComponent key={notification.id} {...notification} onClose={handleCloseNotification} />
            ))}
        </div>
    );
};

export default NotificationCenter;
