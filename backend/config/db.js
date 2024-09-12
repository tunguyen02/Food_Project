import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tu700131:tu700131@cluster0.5fsmr.mongodb.net/food')
        .then(() => console.log("DB Connected"));
    ;
}