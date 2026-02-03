"use client";

const STEPS = [
  { num: 1, label: "Instrumenten" },
  { num: 2, label: "Stageplot" },
  { num: 3, label: "Rider info" },
  { num: 4, label: "Preview" },
  { num: 5, label: "Export" },
];

interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <nav aria-label="Stappen" className="mb-8">
      <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {STEPS.map((step, i) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <li key={step.num} className="flex items-center gap-2">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isActive
                    ? "bg-accent text-white"
                    : isDone
                      ? "bg-green-600 text-white"
                      : "bg-slate-200 text-slate-600"
                }`}
              >
                {isDone ? "✓" : step.num}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  isActive ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {step.label}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  className="hidden h-0.5 w-4 bg-slate-200 sm:inline"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
