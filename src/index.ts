import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import cors from "cors";

import { db } from "./firebase/Firestore";
import { router } from './routes/Get';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

app.use("/", router);

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy')
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT}`)
})