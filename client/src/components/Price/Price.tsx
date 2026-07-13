// Types
type PriceProps = {
  currentPrice: number;
  originalPrice?: number;
  currentPriceClassName: string;
  originalPriceClassName: string;
  isReviewSummary?: boolean;
  isPlanReviewItem?: boolean;
};

export default function Price({
  currentPrice,
  originalPrice,
  currentPriceClassName,
  originalPriceClassName,
  isReviewSummary = false,
  isPlanReviewItem = false,
}: PriceProps) {
  return (
    <div
      className={`flex items-end ${isReviewSummary ? "flex-row gap-2 xl:-mt-1.25" : "flex-col md:flex-row xl:flex-col"}`}
    >
      {originalPrice !== undefined && originalPrice > currentPrice && (
        <span className={` ${originalPriceClassName}`}>
          ${originalPrice}
          {isPlanReviewItem ? "/mo" : ""}
        </span>
      )}
      {currentPrice === 0 ? (
        <span className={`ml-0 xl:ml-0 ${currentPriceClassName}`}>FREE</span>
      ) : (
        <span className={`ml-0 xl:ml-0 ${currentPriceClassName}`}>
          ${currentPrice}
          {isPlanReviewItem ? "/mo" : ""}
        </span>
      )}
    </div>
  );
}
