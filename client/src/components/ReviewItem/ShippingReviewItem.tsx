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
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 shrink-0 rounded-md bg-white flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-9 max-w-9 object-contain"
          />
        </div>

        <h4 className="text-sm font-medium">{title}</h4>
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
