import express from "express";
import morgan from "morgan";
import cors from "cors";
import { candleRouter } from "./routes/candles";

export const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/candles', candleRouter)