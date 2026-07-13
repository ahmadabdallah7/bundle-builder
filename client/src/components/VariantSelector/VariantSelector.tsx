// Types
type Variant = {
  variantId: string;
  color: string;
  thumbnail: string;
  image: string;
};

type VariantSelectorProps = {
  variants: Variant[];
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
};

export default function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {variants.map((variant) => {
        const isSelected = variant.variantId === selectedVariantId;
        return (
          <button
            key={variant.variantId}
            className={`h-6.5 w-16.25 rounded-xs py-px px-0.75 flex items-center justify-center hover:cursor-pointer
              ${
                isSelected
                  ? "border border-[#0AA288]"
                  : "border border-[#CCCCCC]"
              }
            `}
            onClick={() => {
              onVariantChange(variant.variantId);
            }}
          >
            <div className="flex items-center">
              <div>
                <img
                  className="w-7 h-7 shrink-0 mr-0.5"
                  src={variant.thumbnail}
                  alt={variant.color}
                />
              </div>
              <div>
                <h5 className="font-medium text-[10px] leading-[100%]">
                  {variant.color}
                </h5>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
