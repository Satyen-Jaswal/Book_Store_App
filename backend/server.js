import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app=express();

//MiddleWare for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

app.get("/", (req,res)=>{
    return res.send("Welcome");
})

app.use("/books", booksRoute);
    
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("app connected to DB");
        app.listen(PORT, () => {
            console.log(`App listening at port:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
    