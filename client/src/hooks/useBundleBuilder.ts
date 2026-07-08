import { useState, useEffect } from "react";
import axios from "axios";

// Types
type Variant = {
  variantId: string;
  color: string;
  thumbnail: string;
  image: string;
};

type Camera = {
  productId: string;
  name: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  discount: boolean | null;
  badge: string | null;
  image: string;

  variants: Variant[];
};

type Sensor = {
  productId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  discount: boolean | null;
  image: string;
};

type Accessory = {
  productId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  image: string;
};

type Plan = {
  planId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  coverage: string;
  image: string;
};

type ProductsData = {
  products: {
    cameras: Camera[];
    sensors: Sensor[];
    accessories: Accessory[];
  };
  plans: Plan[];
  initialConfiguration: {
    cameras: Camera[];
    sensors: Sensor[];
    accessories: {
      productId: string;
      name: string;
      originalPrice: number;
      currentPrice: number;
      image: string;
    };
    plan: {
      name: string;
      originalPrice: number;
      currentPrice: number;
      image: string;
    };
  };
};

export function useBundleBuilder() {
  const [productsData, setProductsData] = useState<ProductsData | null>(null);

  const [openStep, setOpenStep] = useState<number | null>(1);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("http://localhost:3000/api/products");
      setProductsData(response.data);

      // Variants
      const initialVariants: Record<string, string> = {};

      response.data.products.cameras.forEach(
        (camera: { productId: string; variants: { variantId: string }[] }) => {
          if (camera.variants.length > 0) {
            initialVariants[camera.productId] = camera.variants[0].variantId;
          }
        },
      );
      setSelectedVariants(initialVariants);

      // Quantities
      const initialQuantities: Record<string, number> = {};

      response.data.initialConfiguration.cameras.forEach(
        (camera: { variantId: string; quantity: number }) => {
          initialQuantities[camera.variantId] = camera.quantity;
        },
      );

      response.data.initialConfiguration.sensors.forEach(
        (sensor: { productId: string; quantity: number }) => {
          initialQuantities[sensor.productId] = sensor.quantity;
        },
      );

      initialQuantities[
        response.data.initialConfiguration.accessories.productId
      ] = response.data.initialConfiguration.accessories.quantity;

      setQuantities(initialQuantities);

      // Plan
      setSelectedPlanId("plan-2");
    }
    fetchProducts();
  }, []);

  return {
    productsData,
    openStep,
    setOpenStep,
    selectedVariants,
    setSelectedVariants,
    quantities,
    setQuantities,
    selectedPlanId,
    setSelectedPlanId,
  };
}
