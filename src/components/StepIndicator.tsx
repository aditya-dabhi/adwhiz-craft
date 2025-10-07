interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { number: 1, label: "Platform & Brand" },
    { number: 2, label: "Generate & Preview" },
    { number: 3, label: "Review & Publish" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-8" role="navigation" aria-label="Progress">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-4">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
              currentStep === step.number
                ? "bg-primary text-primary-foreground shadow-sm"
                : currentStep > step.number
                ? "bg-accent/20 text-accent"
                : "bg-muted text-muted-foreground"
            }`}
            aria-current={currentStep === step.number ? "step" : undefined}
          >
            <div className="font-bold text-lg">{step.number}</div>
            <div className="font-medium text-sm">{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 ${currentStep > step.number ? "bg-accent" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
};
