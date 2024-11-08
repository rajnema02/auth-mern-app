const express= require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = 8002;

const route = require("./route/userRoute");
connectDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/auth",route);

app.listen(PORT,()=>console.log(`server is run at ${PORT}`));