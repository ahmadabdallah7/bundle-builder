// Types
type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  style: string;
  product: string;
};

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  style,
  product,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrement}
        disabled={quantity === 0 || product === "sensor-2"}
        className={`flex h-5 w-5 items-center justify-center hover:cursor-pointer rounded-sm ${style} disabled:cursor-not-allowed`}
      >
        <img
          src="/images/buttons/minus.svg"
          alt="Decrease quantity"
          className="h-2 w-2 text-[#575757]"
        />
      </button>
      <span className="mx-2 font-semibold text-sm">{quantity}</span>
      <button
        onClick={onIncrement}
        disabled={product === "sensor-2"}
        className={`flex h-5 w-5 items-center justify-center hover:cursor-pointer rounded-sm disabled:cursor-not-allowed ${style}`}
      >
        <img
          src="/images/buttons/plus.svg"
          alt="Decrease quantity"
          className="h-2 w-2 text-[#575757]"
        />
      </button>
    </div>
  );
}
