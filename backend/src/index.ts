import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import authRoute from "./routes/authRoute"
import animationRoutes from "./routes/animationRoutes";
import "./config/passport"
import cors from "cors"
dotenv.config();

const app = express();
app.use(cors()) ; 
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/animations", animationRoutes);
app.use("/api/auth" , authRoute)
const PORT = process.env.PORT || 5000;


mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
