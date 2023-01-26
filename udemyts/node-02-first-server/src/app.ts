import express, {Request, Response, NextFunction} from 'express';
 import todoRoutes from "./routes/todos"
import { json } from 'body-parser';

//NOTE: const express = require("express") --> this is the regular common JS import syntax but not in TS
const app = express();

//--This is a middle-wave that is provided by a third party package ---//
//--It will parse the bodies of all incoming requests & extract any JSON data it finds in there ---//
app.use(json())

app.use("/todos", todoRoutes)

//--Here we want a middleware function--//
// app.use((req, res, next) => {})

//--Here we want a ERROR middleware function--//
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
res.status(500).json({message: err.message})
})
app.listen(3000);