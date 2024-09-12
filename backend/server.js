import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/food.route.js';
import userRouter from './routes/user.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

//app config
const app = express();
const port = 8080;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

//mongodb+srv://tu700131:<db_password>@cluster0.5fsmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0