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

  useLargeText?: boolean;
  isCamera?: boolean;

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
  useLargeText = false,
  isCamera = false,
}: ProductCardProps) {
  return (
    <div
      id="product-card"
      className={`bg-white rounded-xl p-2.5 relative min-h-39.75 md:min-w-55.75 xl:min-h-39.75 xl:max-h-45 max-w-[361.5px] md:max-w-[320.5px] xl:max-w-[361.5px] flex
        ${isSelected ? "border-2 border-[#4E2FD2B2]" : "border-0"} ${isCamera ? "vlg:h-[341.375px] lg:h-[306.375px] md:h-[321.8px]" : "md:h-[312.375px]"}
      `}
    >
      {product.badge && (
        <span
          id="badge"
          className="absolute top-3 left-3 rounded-full bg-[#4E2FD2] px-3 py-1 text-xs font-semibold leading-[100%] text-white"
        >
          {product.badge}
        </span>
      )}
      <div
        id="main-content"
        className={`flex flex-1 items-center gap-4.75 md:flex-col md:mt-3.5 xl:mt-0 md:items-stretch md:gap-4 xl:flex-row xl:gap-4.75 ${product.badge ? "xl:items-stretch" : "xl:items-center"} `}
      >
        <div
          id="image"
          className={`w-24 shrink-0 flex justify-center items-center md:w-full md:mt-0 xl:w-24 xl:h-auto xl:mt-8 ${
            product.badge ? "mt-8" : ""
          }`}
        >
          <img
            src={image}
            alt={product.name}
            className="max-w-full max-h-full md:max-w-33.75 md:max-h-33.75 xl:max-w-full xl:max-h-full"
          />
        </div>

        <div
          id="others"
          className="flex flex-1 flex-col md:items-center md:text-left xl:items-stretch xl:text-left"
        >
          <div id="info">
            <h4
              className={`font-semibold text-base xl:text-base leading-[100%] mb-2 mt-0 pt-0 ${useLargeText ? "md:text-lg" : ""}`}
            >
              {product.name}
            </h4>
            <p
              className={`font-medium text-xs leading-[130%] text-[#6C6C6C] mt-0 pt-0 tracking-[0.6px] ${useLargeText ? "md:text-sm xl:text-xs" : ""}`}
            >
              {product.description}{" "}
              <span className="text-[#0000EE] underline hover:cursor-pointer">
                Learn More
              </span>
            </p>
          </div>

          {product.variants &&
            selectedVariantId &&
            onVariantChange &&
            product.variants.length > 0 && (
              <div className="mt-2.5 md:w-full xl:w-auto">
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariantId}
                  onVariantChange={onVariantChange}
                />
              </div>
            )}

          <div
            id="price-quantity"
            className="mt-2.5 flex items-end justify-between md:w-full xl:w-auto"
          >
            <QuantityStepper
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              style="bg-[#F0F4F7] disabled:opacity-80 disabled:border-[#E6EBF0] disabled:border-2 disabled:bg-[#FFFFFF]"
              product={product.productId}
            />
            <Price
              originalPrice={product.originalPrice}
              currentPrice={product.currentPrice}
              originalPriceClassName="text-[#D8392B] leading-[100%] font-normal text-base line-through xl:mb-0.75"
              currentPriceClassName="text-[#575757] leading-[100%] font-normal text-base md:ml-0.75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
