const router = require("express").Router();
const routeHandlers = require("../controllers/route handlers/handlers")
const express = require("express");
const {checkUserAuth} = require("../controllers/middleware/authenticationChecks");
const {protectRoute} = require("../controllers/middleware/accessFilter");


module.exports = (app) => {

    router.use(checkUserAuth);

    router.get("/",routeHandlers.homePage);
    router.get("/home",routeHandlers.homePage);
    router.get("/login",routeHandlers.loginForm);
    router.get("/register",routeHandlers.registerForm);
    router.get("/shared-tripps",protectRoute,routeHandlers.sharedTripps);
    router.get("/offer-tripp",protectRoute,routeHandlers.offerTrippPage);
    router.get("/logout",routeHandlers.logOutUser);
    router.get("/details/:_id",protectRoute,routeHandlers.trippDetailsPage);
    router.get("/join-tripp/:_id",protectRoute,routeHandlers.joinTripp);

    router.post("/offer-tripp",protectRoute,routeHandlers.offerTripp);
    router.post("/login",routeHandlers.logInUser);
    router.post("/register",routeHandlers.registerUser);

    app.use(router);

}