// Components
import ReviewSection from "../ReviewSection/ReviewSection";
import ReviewItem from "../ReviewItem/ReviewItem";
import PlanReviewItem from "../ReviewItem/PlanReviewItem";
import ShippingReviewItem from "../ReviewItem/ShippingReviewItem";
import ReviewSummary from "../ReviewSummary/ReviewSummary";

// Types
import type { Camera, Sensor, Accessory, Plan } from "../../types/bundle";

type ReviewPanelProps = {
  cameras: Camera[];
  sensors: Sensor[];
  accessories: Accessory[];
  plans: Plan[];

  quantities: Record<string, number>;
  selectedPlanId: string;

  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;

  totalOriginalPrice: number;
  totalCurrentPrice: number;

  onSaveBundle: () => void;
  savedMessageVisible: boolean;
};

export default function ReviewPanel({
  cameras,
  sensors,
  accessories,
  plans,
  quantities,
  selectedPlanId,
  onIncrement,
  onDecrement,
  totalCurrentPrice,
  totalOriginalPrice,
  onSaveBundle,
  savedMessageVisible,
}: ReviewPanelProps) {
  return (
    <div className="bg-[#EDF4FF] p-3.75 pb-7.75 mb-0 md:mb-8 xl:mb-0 rounded-xl">
      <div className="xl:block md:grid md:grid-cols-[minmax(0,552px)_minmax(0,486px)] md:gap-13 md:justify-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#484848]">
            Review
          </p>
          <h2 className="mt-4 text-[22px] font-semibold leading-[100%]">
            Your security system
          </h2>

          <p className="mt-1 text-sm font-medium text-[#1F1F1FBF] leading-[130%]">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
          <div className="mt-4 border-b mb-2 border-[#D7DDE6]" />

          <ReviewSection title="CAMERAS">
            {cameras.flatMap((camera) => {
              if (camera.variants.length > 0) {
                return camera.variants
                  .filter((variant) => (quantities[variant.variantId] ?? 0) > 0)
                  .map((variant) => (
                    <ReviewItem
                      key={variant.variantId}
                      image={variant.image}
                      name={`${camera.name} (${variant.color})`}
                      quantity={quantities[variant.variantId]}
                      originalPrice={camera.originalPrice}
                      currentPrice={camera.currentPrice}
                      onIncrement={() => onIncrement(variant.variantId)}
                      onDecrement={() => onDecrement(variant.variantId)}
                      productId={variant.variantId}
                    />
                  ));
              }

              if ((quantities[camera.productId] ?? 0) > 0) {
                return (
                  <ReviewItem
                    key={camera.productId}
                    image={camera.image}
                    name={camera.name}
                    quantity={quantities[camera.productId]}
                    originalPrice={camera.originalPrice}
                    currentPrice={camera.currentPrice}
                    onIncrement={() => onIncrement(camera.productId)}
                    onDecrement={() => onDecrement(camera.productId)}
                    productId={camera.productId}
                  />
                );
              }

              return [];
            })}
          </ReviewSection>

          <ReviewSection title="SENSORS">
            {sensors
              .filter((sensor) => (quantities[sensor.productId] ?? 0) > 0)
              .map((sensor) => (
                <ReviewItem
                  key={sensor.productId}
                  image={sensor.image}
                  name={sensor.name}
                  required={sensor.required}
                  quantity={quantities[sensor.productId]}
                  originalPrice={sensor.originalPrice}
                  currentPrice={sensor.currentPrice}
                  onIncrement={() => onIncrement(sensor.productId)}
                  onDecrement={() => onDecrement(sensor.productId)}
                  productId={sensor.productId}
                />
              ))}
          </ReviewSection>

          <ReviewSection title="ACCESSORIES">
            {accessories
              .filter((accessory) => (quantities[accessory.productId] ?? 0) > 0)
              .map((accessory) => (
                <ReviewItem
                  key={accessory.productId}
                  image={accessory.image}
                  name={accessory.name}
                  quantity={quantities[accessory.productId]}
                  originalPrice={accessory.originalPrice}
                  currentPrice={accessory.currentPrice}
                  onIncrement={() => onIncrement(accessory.productId)}
                  onDecrement={() => onDecrement(accessory.productId)}
                  productId={accessory.productId}
                />
              ))}
          </ReviewSection>

          <ReviewSection title="PLAN">
            {plans
              .filter((plan) => plan.planId === selectedPlanId)
              .map((plan) => (
                <PlanReviewItem
                  key={plan.planId}
                  image={plan.image}
                  name={plan.name}
                  originalPrice={plan.originalPrice}
                  currentPrice={plan.currentPrice}
                />
              ))}
          </ReviewSection>

          <div>
            <ShippingReviewItem
              image="/images/Delivery.png"
              title="Fast Shipping"
              originalPrice={5.99}
              currentPrice={0}
            />
          </div>
        </div>

        <div>
          <ReviewSummary
            totalOriginalPrice={totalOriginalPrice}
            totalCurrentPrice={totalCurrentPrice}
            onSaveBundle={onSaveBundle}
            savedMessageVisible={savedMessageVisible}
          />
        </div>
      </div>
    </div>
  );
}
