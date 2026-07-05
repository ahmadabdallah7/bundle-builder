import { useState, useEffect } from "react";
import axios from "axios";

export function useBundleBuilder() {
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("https://localhost:3000/api/products");
      setProductsData(response.data);
    }
    fetchProducts();
  }, []);

  return {
    productsData,
  };
}
