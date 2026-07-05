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
  productId: number;
  name: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  discount: boolean | null;
  badge: string | null;
  image: string;

  variants: Variant[];
};

type ProductCardProps = {
  product: Product;

  selectedVariantId?: string;
  quantity: number;

  onVariantChange: (variantId: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function ProductCard() {
  return (
    <div>
      <div></div>
    </div>
  );
}
