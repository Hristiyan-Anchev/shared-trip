const dotenv = require("dotenv");
const result = dotenv.config();

if(result.error){

    throw result.error;
}
//********************************************************
const port = process.env.SERVER_PORT;
const appConfig = require("./config/express");
const express = require("express");
const mongoose = require("./config/mongoose");
const routesConfig = require("./config/routesConfig");



const app = express();
appConfig(app);
routesConfig(app);


app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})








