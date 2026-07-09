import { useState, useEffect } from "react";
import axios from "axios";

// Types
import type { ProductsData } from "../types/bundle";

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
