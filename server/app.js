import express from 'express';
import cors from 'cors';
import { userRouter } from './router/userRouter.js'
import {logErrors} from './middleware/logError.js'
// import {verifyToken} from './middleware/verifyToken.js'
import { formsRouter } from './router/formsRouter.js';
import { restaurantRouter } from './router/restaurantRouter.js';

// import 'dotenv/config'


const app = express();
app.use(express.json());
app.use(cors());
// app.use(verifyToken)
app.use('/user', userRouter);
app.use('/forms', formsRouter);
app.use('/restaurant', restaurantRouter);

app.use(logErrors);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});

