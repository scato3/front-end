"use client";

import { ReactElement, ReactNode, useState } from "react";

export interface Step {
  name: string;
  children: ReactNode;
}

export interface Funnel {
  children: Array<ReactElement<Step>>;
}

export const useFunnel = <T extends string>(defaultStep: T) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: Step): ReactElement => {
    return <>{props.children}</>;
  };

  const FunnelRoot = ({ children }: Funnel) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);
    return <>{targetStep}</>;
  };
  const Funnel = Object.assign(FunnelRoot, { Step });

  return [Funnel, setStep] as const;
};
