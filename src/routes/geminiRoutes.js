
import express from "express";
import rateLimit from "express-rate-limit";
import { handleGenerate } from "../controllers/geminiController.js";

const router = express.Router();

const recipeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error:
      "Muitas solicitações feitas a partir deste IP, tente novamente depois de 15 minutos.",
  },
});

router.post("/generate", recipeLimiter, handleGenerate);

export default router;
