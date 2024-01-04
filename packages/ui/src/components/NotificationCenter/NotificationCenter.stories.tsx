import { Button } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import NotificationCenter, { notify } from './NotificationCenter';
import styles from './styles.module.css';
import { Notification } from './types';

export default {
    title: 'Example/NotificationCenter',
    component: NotificationCenter,
} as Meta<typeof NotificationCenter>;

type NotificationCenterProps = React.ComponentProps<typeof NotificationCenter>;
type SnackbarProps = Notification & {
    onClose: (id: string) => void;
};

const Template: StoryFn<NotificationCenterProps> = (args) => {
    return (
        <>
            <NotificationCenter {...args} />
            <Button onClick={() => notify({ message: 'test', type: 'info' })}>Notify</Button>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    className: styles.wrapper,
    SnackbarComponent: ({ onClose, id, message }: SnackbarProps) => (
        <button className={styles.button} type="button" onClick={() => onClose(id)} key={id}>
            <div>
                {message} {id}
            </div>
        </button>
    ),
};
