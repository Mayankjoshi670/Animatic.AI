import express from "express";
import passport from "passport";
import { login, signup } from "../controllers/authController";
import { generateToken } from "../services/generateToken";

const router = express.Router();

// Manual auth
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), (req, res) => {
  const token = generateToken((req.user as any)._id.toString());
  res.redirect(`http://localhost:5173?token=${token}`);
});

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login", session: false }), (req, res) => {
  const token = generateToken((req.user as any)._id.toString());
  res.redirect(`http://localhost:5173?token=${token}`);
});

export default router;
