// src/component/common/NoStudy/NoStudy.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NoStudy from '@/component/common/noStudy';

export default {
  title: 'Components/NoStudy',
  component: NoStudy,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['NoStudy', 'NoLogin', 'NoSpeed', 'NoProgress'],
      },
      description: '컴포넌트의 유형을 선택합니다.',
      defaultValue: 'NoStudy',
    },
  },
} as Meta<typeof NoStudy>;

const Template: StoryFn<{
  type: 'NoStudy' | 'NoLogin' | 'NoSpeed' | 'NoProgress';
}> = (args) => <NoStudy {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'NoStudy',
};

export const NoLogin = Template.bind({});
NoLogin.args = {
  type: 'NoLogin',
};

export const NoSpeed = Template.bind({});
NoSpeed.args = {
  type: 'NoSpeed',
};

export const NoProgress = Template.bind({});
NoProgress.args = {
  type: 'NoProgress',
};
