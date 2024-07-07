import express from 'express';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import { userRouter } from './router/userRouter.js'
import {logErrors} from './middleware/logError.js'
import { restaurantRouter } from './router/restaurantRouter.js';
import { restaurantMenuRouter} from './router/restaurantMenuRouter.js';
import { orderRouter } from './router/orderRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);
app.use('/restaurantMenu', restaurantMenuRouter);
app.use('/order', orderRouter);

app.use("/img", express.static(__dirname + '/img'));
app.use(logErrors);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
});

