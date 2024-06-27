import express from 'express';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import { userRouter } from './router/userRouter.js'
import {logErrors} from './middleware/logError.js'
// import {verifyToken} from './middleware/verifyToken.js'
import { formsRouter } from './router/formsRouter.js';
import { restaurantRouter } from './router/restaurantRouter.js';
import { menuRouter} from './router/menuRouter.js'
import { itemsRouter} from './router/itemsRouter.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import 'dotenv/config'


const app = express();
app.use(express.json());
app.use(cors());
// app.use(verifyToken)
// app.use('/i',express.static(""))
app.use('/user', userRouter);
app.use('/forms', formsRouter);
app.use('/restaurant', restaurantRouter);
app.use('/menu', menuRouter);
app.use('/items', itemsRouter);
app.use("/img", express.static(__dirname + '/img'));
app.use(logErrors);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});

