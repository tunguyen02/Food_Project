import FoodModel from '../models/food.model.js';
import fs from 'fs';

const foodController = {
    addFood: async (req, res) => {

        let image_filename = `${req.file.filename}`;

        const food = new FoodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        try {
            await food.save();
            res.json({
                success: true,
                message: 'Food added successfully',
                product: food
            });
        } catch (error) {
            res.json({
                success: false,
                message: "error"
            })
        }
    },

    getListFood: async (req, res) => {
        try {
            const foods = await FoodModel.find({});
            res.status(200).json({
                success: true,
                data: foods
            });
        } catch (error) {
            res.json({
                success: false,
                message: "error"
            })
        }
    },

    removeFoodItem: async (req, res) => {
        try {
            const food = await FoodModel.findById(req.body.id);
            if (!food) {
                return res.status(404).send("Food not found");
            }
            fs.unlinkSync(`uploads/${food.image}`, () => { });
            await FoodModel.findByIdAndDelete(req.body.id);
            res.status(200).json({
                success: true,
                message: 'Food deleted successfully'
            });
        } catch (error) {
            res.json({
                success: false,
                message: "error"
            })
        }
    }
};

export default foodController;
