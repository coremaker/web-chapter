import { Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Example/Typography',
    component: Typography,
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => <Typography {...args} />;

export const BodyLargeBold = Template.bind({});
BodyLargeBold.args = {
    children: 'The quick brown fox jumps over the lazy dog',
    color: 'primary.600',
    variant: 'bodyLargeBold',
};

export const CaptionSmall = Template.bind({});
CaptionSmall.args = {
    children: 'The quick brown fox jumps over the lazy dog',
    color: 'charcoal.500',
    variant: 'captionSmall',
};
