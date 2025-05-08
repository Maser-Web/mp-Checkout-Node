import { Router } from "express";
import { webhookController } from "../controllers/webhook.controller.js";

const routerWebhooks = Router(); 

routerWebhooks.post('/webhook', webhookController)

export default routerWebhooks