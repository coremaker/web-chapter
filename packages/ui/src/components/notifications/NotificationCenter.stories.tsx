import { Meta, StoryFn } from '@storybook/react';
import NotificationCenter, { notify } from './NotificationCenter';
import { Button } from '@mui/material';
import styles from './styles.module.css';

export default {
    title: 'Example/NotificationCenter',
    component: NotificationCenter,
} as Meta<typeof NotificationCenter>;

type NotificationCenterProps = React.ComponentProps<typeof NotificationCenter>;

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
    SnackbarComponent: (props: any) => (
        <button className={styles.button} type="button" onClick={props.onClose} key={props.id}>
            <div>
                {props.message} {props.id}
            </div>
        </button>
    ),
};
