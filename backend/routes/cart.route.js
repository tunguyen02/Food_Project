import express from 'express';
import cartController from '../controllers/cart.controller.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, cartController.addToCart);
cartRouter.post("/remove", authMiddleware, cartController.removeFromCart);
cartRouter.get("/get", authMiddleware, cartController.getCart);

export default cartRouter;