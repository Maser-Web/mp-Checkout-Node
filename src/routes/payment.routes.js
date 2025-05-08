import { Router } from "express";
import { createOrder, success, failure, pending } from "../controllers/payment.controller.js";

const routerPayment = Router();

routerPayment.post('/create-order', createOrder);
routerPayment.get('/success', success);
routerPayment.get('/failure', failure);
routerPayment.get('/pending', pending);

export default routerPayment

