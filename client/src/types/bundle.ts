export type Variant = {
  variantId: string;
  color: string;
  thumbnail: string;
  image: string;
};

export type Camera = {
  productId: string;
  name: string;
  isCamera: boolean;
  description: string;
  originalPrice: number;
  currentPrice: number;
  discount: boolean | null;
  badge: string | null;
  image: string;

  variants: Variant[];
};

export type Sensor = {
  productId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  discount: boolean | null;
  required: boolean;
  image: string;
};

export type Accessory = {
  productId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  image: string;
};

export type Plan = {
  planId: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  coverage: string;
  image: string;
};

export type ProductsData = {
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
