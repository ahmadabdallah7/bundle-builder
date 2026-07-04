import express from "express";
import cors from "cors";

// Setup
const app = express();
const port = 3000;

// Enabling CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Backend server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
