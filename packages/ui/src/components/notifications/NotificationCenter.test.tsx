import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NotificationCenter, { notify } from './NotificationCenter';
import { Notification } from './types';

type SnackbarProps = Notification & { onClose: (id: string) => void };

function randomString() {
    return Math.random().toString(36).substring(2, 15);
}
const mockRandomUUID = vi.fn(() => {
    return `${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}`;
});
global.crypto = {
    subtle: global.crypto.subtle,
    getRandomValues: vi.fn(),
    randomUUID: mockRandomUUID as () => `${string}-${string}-${string}-${string}-${string}`,
};
const NOTIFICATION_EVENT = 'emit-core-notification';

describe('NotificationCenter', () => {
    const mockNotification = (message: string) => {
        const notification: Partial<Notification> = {
            type: 'info',
            message,
            createdAt: new Date(),
            id: randomString(),
        };
        return notification;
    };
    const emitEvent = (message: string) => {
        const event: CustomEvent<Partial<Notification>> = new CustomEvent(NOTIFICATION_EVENT, {
            detail: mockNotification(message),
        });
        fireEvent(document, event);
    };
    const SnackComponent = ({ onClose, id, message }: SnackbarProps) => (
        <button type="button" onClick={() => onClose(id)} key={id}>
            {message}
        </button>
    );
    const renderComponent = (props: { hideAfter?: number; maxNotifications?: number; cacheTimeout?: number } = {}) => {
        return render(<NotificationCenter SnackbarComponent={SnackComponent} {...props} />);
    };

    beforeEach(() => {
        vi.useFakeTimers();
    });

    it('should render a notification', () => {
        const { getByText } = renderComponent();

        emitEvent('test');

        expect(getByText('test')).toBeInTheDocument();
    });

    it("should render a stack of notifications, up to the component's maxNotifications prop", () => {
        const { queryByText } = renderComponent();

        waitFor(() => {
            emitEvent('test-1');
            emitEvent('test-2');
            emitEvent('test-3');
            emitEvent('test-4');
            emitEvent('test-5');
            emitEvent('test-6');
        });

        expect(queryByText('test-1')).not.toBeInTheDocument();
        expect(queryByText('test-2')).toBeInTheDocument();
        expect(queryByText('test-3')).toBeInTheDocument();
        expect(queryByText('test-4')).toBeInTheDocument();
        expect(queryByText('test-5')).toBeInTheDocument();
        expect(queryByText('test-6')).toBeInTheDocument();
    });

    it('should hide notifications after the hideAfter prop', () => {
        const { queryByText } = renderComponent({ hideAfter: 1000 });

        emitEvent('test-1');

        expect(queryByText('test-1')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        waitFor(() => {
            expect(queryByText('test-1')).not.toBeInTheDocument();
        });
    });

    it('should hide notifications after the cacheTimeout prop', () => {
        const { queryByText, getByTestId } = renderComponent({ cacheTimeout: 1000 });

        emitEvent('test-1');
        emitEvent('test-2');
        emitEvent('test-3');

        expect(queryByText('test-1')).toBeInTheDocument();
        expect(queryByText('test-2')).toBeInTheDocument();
        expect(queryByText('test-3')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        waitFor(() => {
            expect(getByTestId('notification-center')).toBeEmptyDOMElement();
        });
    });

    it("should close the notification when it's onClose prop is called", () => {
        const { queryByText, getByText } = renderComponent();

        emitEvent('test-1');

        expect(queryByText('test-1')).toBeInTheDocument();

        act(() => {
            fireEvent.click(getByText('test-1'));
        });

        waitFor(() => {
            expect(queryByText('test-1')).not.toBeInTheDocument();
        });
    });
});

describe('notify', () => {
    it('should dispatch a CustomEvent', () => {
        const eventListener = vi.fn();
        document.addEventListener(NOTIFICATION_EVENT, eventListener);

        notify({ type: 'info', message: 'test' });

        expect(eventListener).toHaveBeenCalled();
    });

    it('should dispatch a CustomEvent with a random UUID', () => {
        const eventListener = vi.fn();
        document.addEventListener(NOTIFICATION_EVENT, eventListener);
        const mockLocalRandomUUID = vi.fn(() => 'test-uuid');
        global.crypto = {
            ...global.crypto,
            randomUUID: mockLocalRandomUUID as () => `${string}-${string}-${string}-${string}-${string}`,
        };

        act(() => {
            notify({ type: 'info', message: 'test' });
        });

        expect(eventListener).toHaveBeenCalled();
        const customEvent = eventListener.mock.calls[0][0];

        expect(customEvent).toBeInstanceOf(CustomEvent);

        expect(customEvent.detail).toMatchObject({
            type: 'info',
            message: 'test',
            open: true,
            id: expect.any(String),
        });

        document.removeEventListener(NOTIFICATION_EVENT, eventListener);
    });
});
