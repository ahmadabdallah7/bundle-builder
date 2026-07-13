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
    <div className="flex items-center">
      <div className="w-6 h-7 shrink-0 rounded-md flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-h-6 max-w-5.25 object-contain"
        />
      </div>

      <div className="flex-1">
        <h4 className="text-base font-bold text-[#000000] -mt-1 ml-px">
          Cam <span className="text-[#4E2FD2]">{name}</span>
        </h4>
      </div>
      <Price
        originalPrice={originalPrice}
        currentPrice={currentPrice}
        originalPriceClassName="font-semibold text-xs sm:text-base xl:text-[14px] leading-4 text-[#6F7882] line-through text-right"
        currentPriceClassName="font-semibold text-xs sm:text-base xl:text-[14px] leading-4 text-[#4E2FD2] font-semibold text-right md:ml-2.5"
        isPlanReviewItem={true}
      />
    </div>
  );
}
