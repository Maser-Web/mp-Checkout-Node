import { Router } from "express";
import routerPayment from "./payment.routes.js";
import routerWebhooks from "./webhook.routes.js";

const routerIndex = Router();

routerIndex.use('/payment', routerPayment)
routerIndex.use('/responseMp', routerWebhooks)

export default routerIndex