import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderController = {
    placeOrder: async (req, res) => {

        const frontendUrl = 'http://localhost:5173';

        try {
            const newOrder = new OrderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address
            });
            await newOrder.save();
            await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

            const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 * 80
                },
                quantity: item.quantity
            }))

            line_items.push({
                currency: "inr",
                price_data: {
                    product_data: {
                        name: "Delivery Charge"
                    },
                    unit_amount: 2 * 100 * 80
                },
                quantity: 1
            })

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: "payment",
                success_url: `${frontendUrl}/verify/?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontendUrl}/verify/?success=false&orderId=${newOrder._id}`
            })

            res.json({
                success: true,
                session_url: session.url
            })
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
    },

    verifyOrder: async (req, res) => {
        const { orderId, success } = req.body;

        try {
            if (success == "true") {
                await OrderModel.findByIdAndUpdate(orderId, { payment: true });
                res.json({
                    success: true,
                    message: "Order placed successfully"
                })
            }
            else {
                await OrderModel.findByIdAndDelete(orderId);
                res.json({
                    success: false,
                    message: "Order failed"
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
    },

    userOrders: async (req, res) => {
        try {
            const orders = await OrderModel.find({ userId: req.body.userId });
            res.json({
                success: true,
                data: orders
            })
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
    },

    listOrders: async (req, res) => {
        try {
            const orders = await OrderModel.find({});
            res.json({
                success: true,
                data: orders
            })
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })

        }
    },

    updateStatus: async (req, res) => {
        try {
            await OrderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
            res.json({
                success: true,
                message: "Order status updated"
            })
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
    }

}


export default orderController;