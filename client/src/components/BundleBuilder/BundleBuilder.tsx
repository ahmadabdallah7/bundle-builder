import { useBundleBuilder } from "../../hooks/useBundleBuilder";

// Components
import Accordion from "../Accordion/Accordion";
import ProductCard from "../ProductCard/ProductCard";
import PlanCard from "../PlanCard/PlanCard";
import ReviewPanel from "../ReviewPanel/ReviewPanel";

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

  function onIncrement(id: string) {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  }

  function onDecrement(id: string) {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] - 1,
    }));
  }

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

            const isSelected = camera.variants.some(
              (variant) => (quantities[variant.variantId] ?? 0) > 0,
            );

            const selectedVariant = camera.variants.find(
              (variant) => variant.variantId === selectedVariantId,
            );
            const image = selectedVariant?.image ?? camera.image;

            function onVariantChange(newVariantId: string) {
              setSelectedVariants((prev) => ({
                ...prev,
                [camera.productId]: newVariantId,
              }));
            }

            return (
              <ProductCard
                key={camera.productId}
                product={camera}
                selectedVariantId={selectedVariantId}
                quantity={quantities[selectedVariantId] ?? 0}
                onVariantChange={onVariantChange}
                image={image}
                onIncrement={() => onIncrement(selectedVariantId)}
                isSelected={isSelected}
                onDecrement={() => onDecrement(selectedVariantId)}
              />
            );
          })}
        </Accordion>

        <Accordion
          step={2}
          title="Choose your plan"
          icon="/images/Plan.png"
          selectedCount={selectedPlanCount}
          isOpen={openStep === 2}
          onToggle={() => onToggle(2)}
          nextStep="Choose your sensors"
          onNext={onNext}
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan.planId}
              plan={plan}
              isSelected={selectedPlanId === plan.planId}
              onSelect={() => setSelectedPlanId(plan.planId)}
            />
          ))}
        </Accordion>

        <Accordion
          step={3}
          title="Choose your sensors"
          icon="/images/Sensors.png"
          selectedCount={selectedSensorCount}
          isOpen={openStep === 3}
          onToggle={() => onToggle(3)}
          nextStep="Choose your accessories"
          onNext={onNext}
        >
          {sensors.map((sensor) => {
            const image = sensor.image;

            const isSelected = (quantities[sensor.productId] ?? 0) > 0;

            return (
              <ProductCard
                key={sensor.productId}
                product={sensor}
                quantity={quantities[sensor.productId] ?? 0}
                image={image}
                onIncrement={() => onIncrement(sensor.productId)}
                isSelected={isSelected}
                onDecrement={() => onDecrement(sensor.productId)}
              />
            );
          })}
        </Accordion>

        <Accordion
          step={4}
          title="Add extra protection"
          icon="/images/Protection.png"
          selectedCount={selectedAccessoryCount}
          isOpen={openStep === 4}
          onToggle={() => onToggle(4)}
        >
          {accessories.map((accessory) => {
            const image = accessory.image;

            const isSelected = (quantities[accessory.productId] ?? 0) > 0;

            return (
              <ProductCard
                key={accessory.productId}
                product={accessory}
                quantity={quantities[accessory.productId] ?? 0}
                image={image}
                onIncrement={() => onIncrement(accessory.productId)}
                isSelected={isSelected}
                onDecrement={() => onDecrement(accessory.productId)}
              />
            );
          })}
        </Accordion>
      </div>

      <div id="review-panel">
        <ReviewPanel
          cameras={cameras}
          sensors={sensors}
          accessories={accessories}
          plans={plans}
          quantities={quantities}
          selectedPlanId={selectedPlanId}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </div>
    </div>
  );
}
