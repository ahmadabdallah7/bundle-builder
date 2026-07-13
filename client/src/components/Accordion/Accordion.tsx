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

  dimensions: string;
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
  dimensions,
}: AccordionProps) {
  return (
    <div
      id="section"
      className={`overflow-hidden ${isOpen ? "bg-[#EDF4FF] rounded-xl" : "bg-white"}`}
    >
      <div id="header" className="flex flex-col pt-3">
        <div className="px-3">
          <p className="text-[#484848] text-xs font-medium leading-[100%] uppercase mb-1">
            STEP {step} OF 4
          </p>
        </div>

        <div
          className={`border-[#737373] border-t ${isOpen ? "" : "border-b"}`}
        >
          <button
            onClick={onToggle}
            className="w-full text-left px-3 py-4 hover:cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={icon} alt={title} className={dimensions} />
                <h3 className="text-[#0B0D10] font-semibold leading-[100%] text-[22px]">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-2 font-medium text-sm leading-4">
                {selectedCount > 0 && (
                  <span className="text-[#4E2FD2]">
                    {selectedCount} selected
                  </span>
                )}
                <span className="text-[#4E2FD2]">
                  {" "}
                  {isOpen ? (
                    <img src="/images/buttons/upward-chevron.svg" />
                  ) : (
                    <img src="/images/buttons/downward-chevron.svg" />
                  )}{" "}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
      {isOpen && (
        <div id="body" className="pb-5 px-5">
          {children}
          {nextStep && (
            <div className="flex justify-center mt-8">
              <button
                className="border rounded-[7px] border-[#4E2FD2] text-[#4E2FD2] text-lg leading-6 font-semibold px-4 py-2 hover:cursor-pointer"
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
