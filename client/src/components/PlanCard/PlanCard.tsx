// Components
import Price from "../Price/Price";

// Types
type Plan = {
  planId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  coverage: string;
  image: string;
};

type PlanCardProps = {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
};

export default function PlanCard({
  plan,
  isSelected,
  onSelect,
}: PlanCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-xl bg-white p-4 text-center transition border-2 hover:cursor-pointer min-w-[195.328px] max-w-[320px] ${
        isSelected
          ? "border-[#4E2FD2B2]"
          : "border-transparent hover:border-[#CED6DE]"
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <img
          src={plan.image}
          alt={plan.name}
          className="w-16 h-16 shrink-0 object-contain"
        />

        <div className="flex flex-col items-center text-center">
          <h4 className="font-semibold text-lg text-black">
            Cam <span className="text-[#4E2FD2]">{plan.name}</span>
          </h4>

          <p className="font-medium text-xs leading-[130%] text-[#6C6C6C] tracking-[0.6px] whitespace-pre-line">
            {plan.coverage}
          </p>

          <div className="mt-3">
            <Price
              originalPrice={plan.originalPrice}
              currentPrice={plan.currentPrice}
              originalPriceClassName="text-[#D8392B] leading-[100%] bxl:mb-0.75 font-normal text-base line-through"
              currentPriceClassName="text-[#575757] leading-[100%] font-normal text-base md:ml-0.75"
            />
          </div>
        </div>

        <input
          type="radio"
          checked={isSelected}
          readOnly
          className="h-5 w-5 accent-[#4E2FD2]"
        />
      </div>
    </button>
  );
}
