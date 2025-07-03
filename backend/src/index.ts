import express from "express";
import dotenv from "dotenv";
import animationRoutes from "./routes/animationRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/animations", animationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
