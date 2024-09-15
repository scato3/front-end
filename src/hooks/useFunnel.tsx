'use client';

import { ReactElement, ReactNode, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export default function useFunnel<T extends string>(defaultStep: T) {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === step
    );
    return <>{targetStep}</>;
  };

  return [Funnel, Step, setStep] as const;
}
