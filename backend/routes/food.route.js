import express from 'express';
import foodController from '../controllers/food.controller.js';
import multer from 'multer';

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), foodController.addFood);
foodRouter.get("/list", foodController.getListFood);
foodRouter.post("/remove", foodController.removeFoodItem);

export default foodRouter;