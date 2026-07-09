// Components
import VariantSelector from "../VariantSelector/VariantSelector";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import Price from "../Price/Price";

// Types
type Variant = {
  variantId: string;
  color: string;
  thumbnail: string;
  image: string;
};

type Product = {
  productId: string;
  name: string;
  description?: string;
  originalPrice: number;
  currentPrice: number;
  discount?: boolean | null;
  badge?: string | null;
  image: string;

  variants?: Variant[];
};

type ProductCardProps = {
  product: Product;

  selectedVariantId?: string;
  quantity: number;
  isSelected: boolean;
  image: string;

  onVariantChange?: (variantId: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function ProductCard({
  product,
  selectedVariantId,
  quantity,
  onVariantChange,
  onIncrement,
  onDecrement,
  isSelected,
  image,
}: ProductCardProps) {
  return (
    <div
      id="product-card"
      className={
        isSelected
          ? "border-2 border-[#4E2FD2B2] rounded-xl bg-white p-2 relative"
          : "border-0 rounded-xl bg-white p-2 relative"
      }
    >
      {product.badge && (
        <span
          id="badge"
          className="absolute top-3 left-3 rounded-full bg-[#4E2FD2] px-3 py-1 text-xs text-white"
        >
          {product.badge}
        </span>
      )}
      <div id="main-content" className="flex gap-4">
        <div id="image" className="w-24 shrink-0">
          <img src={image} alt={product.name} />
        </div>

        <div id="others" className="flex flex-1 flex-col">
          <div id="info">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <span className="text-[#0000EE] underline">Learn more</span>
          </div>

          {product.variants &&
            selectedVariantId &&
            onVariantChange &&
            product.variants.length > 0 && (
              <div className="mt-3">
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariantId}
                  onVariantChange={onVariantChange}
                />
              </div>
            )}

          <div
            id="price-quantity"
            className="mt-auto flex items-end justify-between"
          >
            <QuantityStepper
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
            <Price
              originalPrice={product.originalPrice}
              currentPrice={product.currentPrice}
              originalPriceClassName="text-[#D8392B] font-normal text-base line-through"
              currentPriceClassName="text-[#575757] font-normal text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
