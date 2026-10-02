import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();
const paymentController = new PaymentController();

router.post("/", paymentController.createPaymentIntent);

export default router;