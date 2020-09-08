const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const routeHandlers = require("../controllers/route handlers/handlers");
const {invalidateBrowserCache} = require("../controllers/middleware/invalidateBrowserCache");
const path = require("path");


module.exports = (app)=>{
    app.locals.context = {};

    app.use(cookieParser(process.env.JWT_SECRET));
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(express.static(path.resolve(path.join(__dirname,"../")), {extensions:["htm","html","hbs","css","js"]}));

    //invalidate browser's cache
    app.use(invalidateBrowserCache);

    app.engine("hbs",handlebars({
        extname:"hbs",
        defaultLayout: false,
        // layoutsDir:path.resolve(__dirname,"../views/layouts"),
        partialsDir:path.resolve(__dirname,"../views/partials")
    }));

    app.set("views",path.resolve(__dirname,"../views/layouts"));
    app.set("view cache",true);
    app.set("view engine","hbs");



}