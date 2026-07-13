// Components
import Price from "../Price/Price";

// Types
type ShippingReviewItemProps = {
  image: string;
  title: string;
  originalPrice: number;
  currentPrice: number;
};

export default function ShippingReviewItem({
  image,
  title,
  originalPrice,
  currentPrice,
}: ShippingReviewItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <div className="flex items-center gap-4">
        <div className="w-10.25 h-10.25 shrink-0 rounded-md bg-white flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-7.25 max-w-7.25 object-contain"
          />
        </div>

        <h4 className="text-sm font-medium leading-4 text-[#0B0D10]">
          {title}
        </h4>
      </div>

      <Price
        originalPrice={originalPrice}
        currentPrice={currentPrice}
        originalPriceClassName="font-semibold text-xs sm:text-base xl:text-[14px] leading-4 text-[#6F7882] line-through text-right"
        currentPriceClassName="font-semibold text-xs sm:text-base xl:text-[14px] leading-4 text-[#4E2FD2] font-semibold text-right md:ml-2.5"
      />
    </div>
  );
}
