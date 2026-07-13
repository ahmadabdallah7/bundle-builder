import { useState } from "react";
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

  // System saving confirmation
  const [savedMessageVisible, setSavedMessageVisible] =
    useState<boolean>(false);

  if (!productsData) {
    return <div>Loading...</div>;
  }

  // Data
  const cameras = productsData.products.cameras;
  const plans = productsData.plans;
  const sensors = productsData.products.sensors;
  const accessories = productsData.products.accessories;

  // Handling the next button press
  function onNext() {
    setOpenStep((prev) => (prev ?? 0) + 1);
  }

  // Accordion toggling
  function onToggle(step: number) {
    setOpenStep((prev) => (prev === step ? null : step));
  }

  // Getting the quantity of the selected camera
  const selectedCameraCount = cameras.filter((camera) => {
    if (camera.variants.length > 0) {
      return camera.variants.some(
        (variant) => (quantities[variant.variantId] ?? 0) > 0,
      );
    }

    return (quantities[camera.productId] ?? 0) > 0;
  }).length;

  // Getting the quantity of the sensor
  const selectedSensorCount = sensors.filter(
    (sensor) => (quantities[sensor.productId] ?? 0) > 0,
  ).length;

  // Getting the quantity of the accessory
  const selectedAccessoryCount = accessories.filter(
    (accessory) => (quantities[accessory.productId] ?? 0) > 0,
  ).length;

  // One plan is selected
  const selectedPlanCount = 1;

  // Handling the incrementing of the QuantityStepper component
  function onIncrement(id: string) {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  }

  // Handling the decrementing of the QuantityStepper component
  function onDecrement(id: string) {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] - 1,
    }));
  }

  // Saving the user bundle to localStorage
  function saveBundle() {
    localStorage.setItem(
      "bundle-builder",
      JSON.stringify({
        selectedVariants,
        quantities,
        selectedPlanId,
      }),
    );

    setSavedMessageVisible(true);

    setTimeout(() => {
      setSavedMessageVisible(false);
    }, 2000);
  }

  // Calculating the total of the original prices
  const totalOriginalPrice = Number(
    // Cameras
    (
      cameras.reduce((total, camera) => {
        const cameraTotal =
          camera.variants.length > 0
            ? camera.variants.reduce(
                (sum, variant) =>
                  sum +
                  (quantities[variant.variantId] ?? 0) * camera.originalPrice,
                0,
              )
            : (quantities[camera.productId] ?? 0) * camera.originalPrice;

        return total + cameraTotal;
      }, 0) +
      // Sensors
      sensors.reduce(
        (total, sensor) =>
          total + (quantities[sensor.productId] ?? 0) * sensor.originalPrice,
        0,
      ) +
      // Accessories
      accessories.reduce(
        (total, accessory) =>
          total +
          (quantities[accessory.productId] ?? 0) * accessory.originalPrice,
        0,
      ) +
      // Plan
      (plans.find((plan) => plan.planId === selectedPlanId)?.originalPrice ?? 0)
    ).toFixed(2),
  );

  // Calculating the total of the current prices
  const totalCurrentPrice = Number(
    (
      cameras.reduce((total, camera) => {
        const cameraTotal =
          camera.variants.length > 0
            ? camera.variants.reduce(
                (sum, variant) =>
                  sum +
                  (quantities[variant.variantId] ?? 0) * camera.currentPrice,
                0,
              )
            : (quantities[camera.productId] ?? 0) * camera.currentPrice;

        return total + cameraTotal;
      }, 0) +
      sensors.reduce(
        (total, sensor) =>
          total + (quantities[sensor.productId] ?? 0) * sensor.currentPrice,
        0,
      ) +
      accessories.reduce(
        (total, accessory) =>
          total +
          (quantities[accessory.productId] ?? 0) * accessory.currentPrice,
        0,
      ) +
      (plans.find((plan) => plan.planId === selectedPlanId)?.currentPrice ?? 0)
    ).toFixed(2),
  );

  return (
    <div>
      {/* The initial title that's shown only on mobile screens */}
      <div className="md:hidden px-4 mb-6">
        <h1 className="text-[32px] text-[#1F1F1F] text-center mt-7.75 font-bold leading-[110%]">
          Let's get started!
        </h1>
      </div>
      <div className="mx-auto mt-6 md:mt-10 xl:mt-12.25 grid w-full max-w-303.25 grid-cols-1 xl:grid-cols-[768px_399px] gap-7.25">
        <div id="accordions" className="w-full xl:w-3xl mx-auto">
          <Accordion
            step={1}
            title="Choose your cameras"
            icon="/images/Cameras.png"
            selectedCount={selectedCameraCount}
            isOpen={openStep === 1}
            onToggle={() => onToggle(1)}
            nextStep="Choose your plan"
            onNext={onNext}
            dimensions="h-6.5 w-6.5"
          >
            <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch xl:grid-cols-2 md:grid-cols-3 vlg:grid-cols-5 gap-3.75">
              {cameras.map((camera, index) => {
                // Getting the initial selected variant of the camera
                const selectedVariantId = selectedVariants[camera.productId];

                // Handling the selected state of each camera card
                const isSelected =
                  camera.variants.length > 0
                    ? camera.variants.some(
                        (variant) => (quantities[variant.variantId] ?? 0) > 0,
                      )
                    : (quantities[camera.productId] ?? 0) > 0;

                const selectedVariant = camera.variants.find(
                  (variant) => variant.variantId === selectedVariantId,
                );
                const image = selectedVariant?.image ?? camera.image;

                // Handling selecting different camera variants
                function onVariantChange(newVariantId: string) {
                  setSelectedVariants((prev) => ({
                    ...prev,
                    [camera.productId]: newVariantId,
                  }));
                }

                // Quantity key used to gather the quantity of the camera/variant
                const quantityKey: string =
                  camera.variants.length > 0
                    ? selectedVariantId!
                    : camera.productId;

                // For the adjusted appearance of the last odd card
                const isLastOddCard =
                  index === cameras.length - 1 && cameras.length % 2 !== 0;

                return (
                  <div
                    key={camera.productId}
                    className={
                      isLastOddCard ? "xl:col-span-2 flex justify-center" : ""
                    }
                  >
                    <div
                      className={
                        isLastOddCard ? "w-full xl:max-w-[50%]" : "w-full"
                      }
                    >
                      <ProductCard
                        key={camera.productId}
                        product={camera}
                        selectedVariantId={selectedVariantId}
                        quantity={quantities[quantityKey] ?? 0}
                        onVariantChange={onVariantChange}
                        image={image}
                        onIncrement={() => onIncrement(quantityKey)}
                        onDecrement={() => onDecrement(quantityKey)}
                        isSelected={isSelected}
                        useLargeText={camera.variants.length === 0}
                        isCamera={camera.isCamera}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
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
            dimensions="h-6.5 w-6.5"
          >
            <div className="grid grid-cols-1 justify-items-center xl:justify-items-stretch md:grid-cols-3 gap-3.75">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.planId}
                  plan={plan}
                  isSelected={selectedPlanId === plan.planId}
                  onSelect={() => setSelectedPlanId(plan.planId)}
                />
              ))}
            </div>
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
            dimensions="h-6.5 w-6.5"
          >
            <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch xl:grid-cols-2 md:grid-cols-[240px_240px_240px] gap-3.75 md:gap-8 xl:gap-3.75">
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
            </div>
          </Accordion>

          <Accordion
            step={4}
            title="Add extra protection"
            icon="/images/Protection.png"
            selectedCount={selectedAccessoryCount}
            isOpen={openStep === 4}
            onToggle={() => onToggle(4)}
            dimensions="h-5 w-4.5 ml-1 mr-1.5"
          >
            <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-[240px_240px_240px] xl:grid-cols-2 gap-3.75 md:gap-6 xl:gap-3.75">
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
            </div>
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
            totalOriginalPrice={totalOriginalPrice}
            totalCurrentPrice={totalCurrentPrice}
            onSaveBundle={saveBundle}
            savedMessageVisible={savedMessageVisible}
          />
        </div>
      </div>
    </div>
  );
}
