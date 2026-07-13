// Components
import Price from "../Price/Price";

// Types
type ReviewSummaryProps = {
  totalOriginalPrice: number;
  totalCurrentPrice: number;
  onSaveBundle: () => void;
  savedMessageVisible: boolean;
};

export default function ReviewSummary({
  totalOriginalPrice,
  totalCurrentPrice,
  onSaveBundle,
  savedMessageVisible,
}: ReviewSummaryProps) {
  return (
    <div className="mt-6 md:mt-0 xl:mt-6">
      {/* Top section */}
      <div className="flex flex-row md:flex-col xl:flex-row gap-6 md:gap-4 xl:gap-6 justify-between items-start md: xl:justify-between xl:items-start">
        {/* Left side */}
        <div className="flex gap-4 -mt-3.5 md:mt-0 xl:-mt-3.5">
          <img
            src="/images/Satisfaction.png"
            alt="Satisfaction Guarantee"
            className="w-19.5 h-19.5 md:w-32.75 md:h-32.75 xl:w-19.5 xl:h-19.5 shrink-0"
          />

          {/* Only shown when ReviewPanel moves below the accordions */}
          <div className="hidden md:block xl:hidden mt-[25.5px] ml-2.25">
            <h3 className="text-[#1F1F1F] text-lg font-semibold leading-[110%]">
              30-day hassle-free returns
            </h3>

            <p className="mt-2 text-lg font-normal leading-[110%] text-[#1F1F1F]">
              If you're not totally in love with the product, we will refund you
              100%.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col md:flex-row xl:flex-col items-end md:items-center mb-4 md:mb-3 xl:mb-4 xl:items-end justify-between md:w-full xl:w-auto xl:justify-start gap-3">
          <div className="rounded bg-[#4E2FD2] px-2 py-1 text-xs font-medium leading-[100%] text-white">
            as low as $19.19/mo
          </div>

          <div>
            <Price
              originalPrice={totalOriginalPrice}
              currentPrice={totalCurrentPrice}
              originalPriceClassName="text-lg font-medium line-through text-[#737373]"
              currentPriceClassName="text-2xl font-bold text-[#4E2FD2]"
              isReviewSummary={true}
            />
          </div>
        </div>
      </div>

      {/* Savings */}
      <p className="text-center text-xs font-semibold leading-[100%] text-[#0AA288]">
        Congrats! You're saving $
        {(totalOriginalPrice - totalCurrentPrice).toFixed(2)} on your security
        bundle!
      </p>

      {/* Checkout */}
      <button className="mt-1 w-full rounded bg-[#4E2FD2] py-3.25 px-4 text-lg font-semibold text-white hover:cursor-pointer">
        Checkout
      </button>

      {/* Save for later */}
      <button
        className="mt-2 w-full text-center font-normal text-sm italic underline text-[#484848] hover:cursor-pointer"
        onClick={onSaveBundle}
      >
        {savedMessageVisible ? "✓ Saved!" : "Save my system for later"}
      </button>
    </div>
  );
}
