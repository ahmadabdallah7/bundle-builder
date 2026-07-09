// Components
import ReviewSection from "../ReviewSection/ReviewSection";
import ReviewItem from "../ReviewItem/ReviewItem";
import PlanReviewItem from "../ReviewItem/PlanReviewItem";
import ShippingReviewItem from "../ReviewItem/ShippingReviewItem";

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
}: ReviewPanelProps) {
  return (
    <div className="bg-[#EDF4FF] p-6">
      <p className="text-xs uppercase tracking-wider text-gray-500">Review</p>

      <h2 className="mt-4 text-3xl font-semibold">Your security system</h2>

      <p className="mt-2 text-gray-600">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
      <div className="mt-4 border-b border-[#D7DDE6]" />

      <ReviewSection title="CAMERAS">
        {cameras.flatMap((camera) =>
          camera.variants
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
              />
            )),
        )}
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

      <div className="">
        <ShippingReviewItem
          image="/images/Delivery.png"
          title="Fast Shipping"
          originalPrice={5.99}
          currentPrice={0}
        />
      </div>
    </div>
  );
}
