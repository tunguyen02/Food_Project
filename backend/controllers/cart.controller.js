import UserModel from '../models/user.model.js';

const cartController = {
    addToCart: async (req, res) => {
        try {
            let userData = await UserModel.findById(req.body.userId);
            let cartData = await userData.cartData;
            if (!cartData[req.body.itemId]) {
                cartData[req.body.itemId] = 1;
            }
            else {
                cartData[req.body.itemId] += 1;
            }
            await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({
                success: true,
                message: "Added To Cart"
            })
        } catch (error) {
            res.json({
                success: false,
                message: "Error"
            })
        }
    },

    removeFromCart: async (req, res) => {
        try {
            let userData = await UserModel.findById(req.body.userId);
            let cartData = await userData.cartData;
            if (cartData[req.body.itemId] > 0) {
                cartData[req.body.itemId] -= 1;
            }
            await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({
                success: true,
                message: "Removed From Cart"
            })
        } catch (error) {
            res.json({
                success: false,
                message: "Error"
            })
        }
    },

    getCart: async (req, res) => {
        try {
            let userData = await UserModel.findById(req.body.userId);
            let cartData = await userData.cartData;
            res.json({
                success: true,
                cartData
            });
        } catch (error) {
            res.json({
                success: false,
                message: "Error"

            })
        }
    }
}

export default cartController;