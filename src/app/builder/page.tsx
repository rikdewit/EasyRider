"use client";

import { useState } from "react";
import Link from "next/link";
import { WizardProgress } from "@/components/WizardProgress";
import { Step1Instruments } from "@/components/steps/Step1Instruments";
import { Step2StagePlot } from "@/components/steps/Step2StagePlot";
import { Step3RiderInfo } from "@/components/steps/Step3RiderInfo";
import { Step4Preview } from "@/components/steps/Step4Preview";
import { Step5Export } from "@/components/steps/Step5Export";
import { useRiderStore } from "@/store/useRiderStore";

const STEPS = 5;

export default function BuilderPage() {
  const [step, setStep] = useState(1);
  const { bandMembers, riderInfo } = useRiderStore();

  const canGoNext = () => {
    if (step === 1) return bandMembers.length >= 1;
    if (step === 3)
      return !!(
        riderInfo.bandName?.trim() &&
        riderInfo.contactName?.trim() &&
        riderInfo.email?.trim()
      );
    return true;
  };

  const goNext = () => {
    if (step < STEPS && canGoNext()) setStep(step + 1);
  };

  const goPrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-lg font-semibold text-slate-800 hover:text-accent"
          >
            Easy Rider
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <WizardProgress currentStep={step} />

        {step === 1 && <Step1Instruments />}
        {step === 2 && <Step2StagePlot />}
        {step === 3 && <Step3RiderInfo />}
        {step === 4 && <Step4Preview />}
        {step === 5 && (
          <>
            {/* Preview verborgen in DOM houden voor PDF-export */}
            <div className="absolute -left-[9999px] top-0 w-[210mm]" aria-hidden>
              <Step4Preview />
            </div>
            <Step5Export />
          </>
        )}

        <div className="mt-10 flex items-center justify-between print:hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={step === 1}
            className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            Vorige
          </button>
          {step < STEPS ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext()}
              className="rounded-lg bg-accent px-6 py-2.5 font-semibold text-white disabled:opacity-50 hover:bg-accent-muted"
            >
              Volgende
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
}
