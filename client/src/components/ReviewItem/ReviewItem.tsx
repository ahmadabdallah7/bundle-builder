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
}: ReviewItemProps) {
  const totalOriginalPrice =
    originalPrice !== undefined ? quantity * originalPrice : undefined;

  const totalCurrentPrice = quantity * currentPrice;

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
        <h4 className="text-sm font-medium leading-5">{name}</h4>
        {required && <span className="text-sm font-medium"> (Required)</span>}
      </div>

      <QuantityStepper
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />

      <Price
        originalPrice={totalOriginalPrice}
        currentPrice={totalCurrentPrice}
        originalPriceClassName="text-xs text-gray-400 line-through text-right"
        currentPriceClassName="text-lg text-[#4E2FD2] font-semibold text-right"
      />
    </div>
  );
}
