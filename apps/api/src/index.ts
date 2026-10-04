import express from "express";
import cors from "cors";
import paymentRoutes from "./features/payment/payment.routes";
import { authenticated } from "./middleware/authenticated";


const app = express();

app.use(cors(
    {
        // Comma-separated list, e.g. "https://snail-app.abrahamsaavedra.com,http://localhost:5173"
        origin: (process.env.CORS_ORIGIN || "http://localhost:5173")
            .split(",")
            .map((origin) => origin.trim()),
    }
));

app.use(express.json());
app.use("/api/payment", authenticated, paymentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});