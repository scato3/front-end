import { Meta, StoryFn } from '@storybook/react';
import Calendar, { CalendarProps } from '@/component/common/calendar';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

// 스토리북 메타데이터 설정
export default {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} as Meta;

// 템플릿 생성
const Template: StoryFn<CalendarProps> = (args) => {
  // react-hook-form 폼 기본값 설정
  const methods = useForm({
    defaultValues: {
      startDate: dayjs().format('YYYY-MM-DD'),
    },
  });

  return (
    <FormProvider {...methods}>
      <div>
        <Calendar
          {...args}
          onClose={() => {
            args.onClose();
          }}
        />
      </div>
    </FormProvider>
  );
};

// 스토리 정의
export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};
