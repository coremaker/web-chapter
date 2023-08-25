import { Meta, StoryFn } from '@storybook/react';
import NotificationCenter, { notify } from './NotificationCenter';
import { Button } from '@mui/material';

export default {
    title: 'Example/NotificationCenter',
    component: NotificationCenter,
} as Meta<typeof NotificationCenter>;

const Template: StoryFn<typeof NotificationCenter> = (args) => (
    <div>
        <NotificationCenter {...args} />

        <Button onClick={() => notify({ type: 'error', message: 'Test' })}>Trigger notification</Button>
    </div>
);

export const Base = Template.bind({});
Base.args = {
    hideAfter: 5000,
    maxNotifications: 10,
    SnackbarComponent: ({ id, open }) => {
        return open ? <div>SnackbarComponent {id}</div> : null;
    },
};
