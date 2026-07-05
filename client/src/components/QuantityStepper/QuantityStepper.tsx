// Types
type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrement}
        disabled={quantity === 0}
        className="bg-white rounded-sm border border-[#CED6DE] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={onIncrement}
        className="bg-white rounded-lg border border-[#CED6DE]"
      >
        +
      </button>
    </div>
  );
}
