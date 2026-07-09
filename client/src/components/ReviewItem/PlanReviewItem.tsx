// Components
import Price from "../Price/Price";

// Types
type PlanReviewItemProps = {
  image: string;
  name: string;

  currentPrice: number;
  originalPrice?: number;
};

export default function ReviewItem({
  image,
  name,
  currentPrice,
  originalPrice,
}: PlanReviewItemProps) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-11 h-11 shrink-0 rounded-md bg-white flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-h-9 max-w-9 object-contain"
        />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium leading-5">
          Cam <span className="text-[#4E2FD2]">{name}</span>
        </h4>
      </div>
      <Price
        originalPrice={originalPrice}
        currentPrice={currentPrice}
        originalPriceClassName="text-xs text-gray-400 line-through text-right"
        currentPriceClassName="text-lg text-[#4E2FD2] font-semibold text-right"
      />
    </div>
  );
}
