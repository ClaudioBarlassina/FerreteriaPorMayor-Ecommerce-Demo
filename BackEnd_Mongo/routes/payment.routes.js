import { Router } from "express";
import { createSession, getSession } from "../controllers/payment.controllers.js";

const router = Router();

router.post("/create-checkout-session", createSession)

router.get("/session/:sessionId", getSession) // 👈 ESTA ES LA IMPORTANTE

router.get("/success", (req, res) => res.send("success"))
router.get("/cancel", (req, res) => res.send("cancel "))

export default router;