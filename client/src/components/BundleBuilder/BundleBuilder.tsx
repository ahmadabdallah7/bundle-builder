import { useBundleBuilder } from "../../hooks/useBundleBuilder";

// Components
import Accordion from "../Accordion/Accordion";
import ProductCard from "../ProductCard/ProductCard";

export default function BundleBuilder() {
  const {
    productsData,
    openStep,
    setOpenStep,
    selectedVariants,
    setSelectedVariants,
    quantities,
    setQuantities,
    selectedPlanId,
    setSelectedPlanId,
  } = useBundleBuilder();

  if (!productsData) {
    return <div>Loading...</div>;
  }

  const cameras = productsData.products.cameras;
  const plans = productsData.plans;
  const sensors = productsData.products.sensors;
  const accessories = productsData.products.accessories;

  function onNext() {
    setOpenStep((prev) => (prev ?? 0) + 1);
  }

  function onToggle(step: number) {
    setOpenStep((prev) => (prev === step ? null : step));
  }

  const selectedCameraCount = cameras.filter((camera) =>
    camera.variants.some((variant) => (quantities[variant.variantId] ?? 0) > 0),
  ).length;

  const selectedSensorCount = sensors.filter(
    (sensor) => (quantities[sensor.productId] ?? 0) > 0,
  ).length;

  const selectedAccessoryCount = accessories.filter(
    (accessory) => (quantities[accessory.productId] ?? 0) > 0,
  ).length;

  const selectedPlanCount = 1;

  return (
    <div className="mx-auto max-w-7xl grid lg:grid-cols-[2fr_1fr] gap-10 mt-16">
      <div id="accordions">
        <Accordion
          step={1}
          title="Choose your cameras"
          icon="/images/Cameras.png"
          selectedCount={selectedCameraCount}
          isOpen={openStep === 1}
          onToggle={() => onToggle(1)}
          nextStep="Choose your plan"
          onNext={onNext}
        >
          {cameras.map((camera) => {
            const selectedVariantId = selectedVariants[camera.productId];

            function onIncrement() {
              setQuantities((prev) => ({
                ...prev,
                [selectedVariantId]: (prev[selectedVariantId] ?? 0) + 1,
              }));
            }

            function onDecrement() {
              setQuantities((prev) => ({
                ...prev,
                [selectedVariantId]: prev[selectedVariantId] - 1,
              }));
            }

            function onVariantChange(newVariantId: string) {
              setSelectedVariants((prev) => ({
                ...prev,
                [camera.productId]: newVariantId,
              }));
            }

            return (
              <ProductCard
                product={camera}
                selectedVariantId={selectedVariantId}
                quantity={quantities[selectedVariantId] ?? 0}
                onVariantChange={onVariantChange}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
