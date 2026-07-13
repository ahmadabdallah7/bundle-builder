// Components
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import Price from "../Price/Price";

// Types
type ReviewItemProps = {
  image: string;
  name: string;

  quantity: number;
  required?: boolean;

  currentPrice: number;
  originalPrice?: number;

  onIncrement: () => void;
  onDecrement: () => void;

  productId: string;
};

export default function ReviewItem({
  image,
  name,
  quantity,
  currentPrice,
  originalPrice,
  required = false,
  onIncrement,
  onDecrement,
  productId,
}: ReviewItemProps) {
  const totalOriginalPrice =
    originalPrice !== undefined
      ? Number((quantity * originalPrice).toFixed(2))
      : undefined;
  const totalCurrentPrice = Number((quantity * currentPrice).toFixed(2));

  return (
    <div className="flex items-center gap-4 pt-1">
      <div className="w-11 h-11 shrink-0 rounded-md bg-white flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-h-9 max-w-9 object-contain"
        />
      </div>

      <div className="flex-1">
        <h4 className="text-xs md:text-lg xl:text-sm font-medium leading-4 text-[#0B0D10]">
          {name}
          {required && (
            <span className="text-xs md:text-lg xl:text-sm font-medium leading-4 text-[#0B0D10]">
              {" "}
              (Required)
            </span>
          )}
        </h4>
      </div>

      <QuantityStepper
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        style="bg-white disabled:border-[#CED6DE] disabled:border disabled:bg-[#F1F1F2]"
        product={productId}
      />

      <Price
        originalPrice={totalOriginalPrice}
        currentPrice={totalCurrentPrice}
        originalPriceClassName="font-semibold text-xs md:text-base xl:text-[14px] leading-4 text-[#6F7882] line-through text-right"
        currentPriceClassName="font-semibold text-xs md:text-base xl:text-[14px] leading-4 text-[#4E2FD2] font-semibold text-right md:ml-2.5"
      />
    </div>
  );
}
