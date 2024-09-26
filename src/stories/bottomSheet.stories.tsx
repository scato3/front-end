import { Meta, StoryFn } from '@storybook/react';
import BottomSheet, { BottomSheetProps } from '@/component/common/bottomSheet';
import { FormProvider, useForm } from 'react-hook-form';
import { durationOption } from '@/data/durationData';

export default {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<BottomSheetProps> = (args) => {
  // react-hook-form 폼 기본값 설정
  const methods = useForm({
    defaultValues: {
      duration: durationOption[0].key,
    },
  });

  return (
    <FormProvider {...methods}>
      <BottomSheet {...args} />
    </FormProvider>
  );
};

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};
