import express from "express";
import cors from "cors";

// Data
import products from "./data/products.json";

// Setup
const app = express();
const port = 3000;

// Enabling CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Data get request
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Backend server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
