// Types
type PriceProps = {
  currentPrice: number;
  originalPrice?: number;
  currentPriceClassName: string;
  originalPriceClassName: string;
};

export default function Price({
  currentPrice,
  originalPrice,
  currentPriceClassName,
  originalPriceClassName,
}: PriceProps) {
  return (
    <div className="flex items-center gap-1">
      {originalPrice !== undefined && originalPrice > currentPrice && (
        <span className={originalPriceClassName}>${originalPrice}</span>
      )}
      {currentPrice === 0 ? (
        <span className={currentPriceClassName}>FREE</span>
      ) : (
        <span className={currentPriceClassName}>${currentPrice}</span>
      )}
    </div>
  );
}
