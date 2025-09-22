
import { config } from "dotenv";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import accountsRoutes from "./routes/accountsRoutes";
import customersRoutes from "./routes/customersRoutes";
import fixedDepositRoutes from "./routes/fixedDepositRoutes";
import liquidityRoutes from "./routes/liquidityRoutes";
import loansRoutes from "./routes/loansRoutes";
import profitLossRoutes from "./routes/profitLossRoutes";

config({})

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per window
    })
);

app.use('/api/accounts', accountsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/fixedDeposits', fixedDepositRoutes);
app.use('/api/liquidity', liquidityRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/profitLoss', profitLossRoutes);

app.listen(PORT, () => {
    console.log(`Express proxy running on port ${PORT}`);
});
