import Button from "./Button";
import { Meta, StoryFn } from "@storybook/react";
import { range } from "@web-chapter/lib";

export default {
	title: "Example/Button",
	component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	text: `${range(3)} GO`,
	color: "primary",
	variant: "contained",
};

export const Secondary = Template.bind({});
Secondary.args = {
	text: "Secondary Button",
	color: "secondary",
	variant: "contained",
};

export const LargeContained = Template.bind({});
LargeContained.args = {
	text: "Large Contained Button",
	color: "danger",
	size: "large",
	variant: "contained",
};

export const Small = Template.bind({});
Small.args = {
	text: "Small Button",
	variant: "contained",
};
