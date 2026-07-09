// Types
type AccordionProps = {
  step: number;
  title: string;
  icon: string;

  isOpen: boolean;
  selectedCount: number;
  nextStep?: string;

  onToggle: () => void;
  onNext?: () => void;

  children: React.ReactNode;
};

export default function Accordion({
  children,
  step,
  title,
  icon,
  isOpen,
  selectedCount,
  nextStep,
  onToggle,
  onNext,
}: AccordionProps) {
  return (
    <div
      id="section"
      className={`rounded-xl overflow-hidden ${isOpen ? "bg-[#EDF4FF]" : "bg-white"}`}
    >
      <div id="header" className="flex flex-col px-5 py-4">
        <div>
          <p className="text-[#484848] text-xs uppercase mb-3">
            STEP {step} OF 4
          </p>
        </div>

        <button
          onClick={onToggle}
          className="w-full text-left hover:cursor-pointer"
        >
          <div
            className={`border-[#737373] border-t py-4 ${isOpen ? "" : "border-b"}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={icon} alt={title} className="w-6.5 h-6.5" />
                <h3 className="text-black text-[22px]">{title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {selectedCount > 0 && <span>{selectedCount} selected</span>}
                <span className="text-[#4E2FD2]"> {isOpen ? "▲" : "▼"} </span>
              </div>
            </div>
          </div>
        </button>
      </div>
      {isOpen && (
        <div id="body" className="py-5 px-5">
          {children}
          {nextStep && (
            <div className="flex justify-center mt-8">
              <button
                className="border border-[#4E2FD2] text-[#4E2FD2] text-lg px-4 py-2 hover:cursor-pointer"
                onClick={onNext}
              >
                Next: {nextStep}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
