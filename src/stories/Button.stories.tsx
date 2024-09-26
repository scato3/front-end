import { Meta, StoryFn } from '@storybook/react';
import Button from '@/component/common/button';
import { IButtonProps } from '@/component/common/button';
import { fn } from '@storybook/test';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    disabled: { control: 'boolean' },
  },
  args: { onClick: fn() },
} as Meta;

const Template: StoryFn<IButtonProps> = (args) => (
  <Button {...args}>버튼</Button>
);

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  disabled: false,
  children: 'Large Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  disabled: false,
  children: 'Medium Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  disabled: false,
  children: 'Small Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button',
};
