'use client';

import styles from './createStudy.module.scss';
import Step1 from '@/component/createStudy/step1';
import Step2 from '@/component/createStudy/step2';
import Step3 from '@/component/createStudy/step3';
import useFunnel from '@/hooks/useFunnel';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateStudyDataType } from '@/types/createStudy/create';
import { createStudyData } from '@/data/createStudyData';
import LastPage from '@/component/createStudy/lastPage';

const steps: string[] = ['Step1', 'Step2', 'Step3', 'Last'];

export default function FastMatching() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  // useForm 초기화
  const methods = useForm<CreateStudyDataType>({
    defaultValues: createStudyData,
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Funnel>
          <Step name="Step1">
            <Step1 onNext={() => setStep('Step2')}></Step1>
          </Step>
          <Step name="Step2">
            <Step2
              onNext={() => setStep('Step3')}
              onBefore={() => setStep('Step1')}
            ></Step2>
          </Step>

          <Step name="Step3">
            <Step3
              onNext={() => setStep('Last')}
              onBefore={() => setStep('Step2')}
            ></Step3>
          </Step>
          <Step name="Last">
            <LastPage onBefore={() => setStep('Step3')}></LastPage>
          </Step>
        </Funnel>
      </div>
    </FormProvider>
  );
}
