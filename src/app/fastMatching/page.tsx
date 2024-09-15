'use client';

import styles from './fastMatching.module.scss';
import Step1 from '@/component/fastMatching/step1';
import Step2 from '@/component/fastMatching/step2';
import Step3 from '@/component/fastMatching/step3';
import LastPage from '@/component/fastMatching/lastPage';
import { QuickMatchInitialData } from '@/data/quickMatchData';
import useFunnel from '@/hooks/useFunnel';
import { QuickMatchProps } from '@/types/quick/quickMatchType';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FilterDataType } from '@/types/fastMatching/filterType';
import { useGetStudyFilter } from '@/apis/fastMatching/filter';

const steps: string[] = ['Step1', 'Step2', 'Step3', 'Last'];

export default function FastMatching() {
  const { data: filterData } = useGetStudyFilter();
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  // useForm 초기화
  const methods = useForm<QuickMatchProps>({
    defaultValues: QuickMatchInitialData,
  });

  const { reset } = methods;

  const [data, setData] = useState<FilterDataType>();

  useEffect(() => {
    if (filterData) {
      const save = !!(
        filterData.mem_scope?.length ||
        filterData.tendency?.length ||
        filterData.category ||
        filterData.duration
      );

      const transformedData = {
        ...QuickMatchInitialData,
        mem_scope: filterData.mem_scope,
        tendency: filterData.tendency,
        category: filterData.category,
        duration: filterData.duration,
        save,
      };

      reset(transformedData);
    }
  }, [filterData]);

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
              setData={setData}
            ></Step3>
          </Step>
          <Step name="Last">
            <LastPage onBefore={() => setStep('Step3')} data={data}></LastPage>
          </Step>
        </Funnel>
      </div>
    </FormProvider>
  );
}
