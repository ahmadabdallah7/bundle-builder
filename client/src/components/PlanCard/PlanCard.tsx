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
      className={`w-full rounded-xl bg-white p-4 text-left transition border-2 hover:cursor-pointer ${
        isSelected
          ? "border-[#4E2FD2B2]"
          : "border-transparent hover:border-[#CED6DE]"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={plan.image}
          alt={plan.name}
          className="w-16 h-16 shrink-0 object-contain"
        />

        <div className="flex-1">
          <h4 className="font-semibold text-lg text-black">
            Cam <span className="text-[#4E2FD2]">{plan.name}</span>
          </h4>

          <p className="mt-1 text-sm text-[#575757]">{plan.coverage}</p>

          <div className="mt-3">
            <Price
              originalPrice={plan.originalPrice}
              currentPrice={plan.currentPrice}
              originalPriceClassName="text-[#D8392B] text-base line-through"
              currentPriceClassName="text-[#575757] text-base"
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
