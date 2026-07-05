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
            className={
              isSelected
                ? "border rounded-lg border-[#0AA288]"
                : "border rounded-lg border-[#CCCCCC]"
            }
            onClick={() => {
              onVariantChange(variant.variantId);
            }}
          >
            <img
              className="w-7 h-7 mr-0.5"
              src={variant.thumbnail}
              alt={variant.color}
            />
            {variant.color}
          </button>
        );
      })}
    </div>
  );
}
