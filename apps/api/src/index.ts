import express from "express";
import cors from "cors";
import paymentRoutes from "./features/payment/payment.routes";
import { authenticated } from "./middleware/authenticated";


const app = express();

app.use(cors(
    {
        origin: [
            process.env.CORS_ORIGIN || "http://localhost:5173",
        ]
    }
));

app.use(express.json());
app.use("/api/payment", authenticated, paymentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});