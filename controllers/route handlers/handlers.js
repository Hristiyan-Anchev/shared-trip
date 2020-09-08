const jwtsecret = process.env.JWT_SECRET;
const validators = require("../../misc/validators");
const {generateUserJWT} = require("../../misc/generateUserJWT");
const models = require("../../entities/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    homePage: function (req, res) {
        const {context} = req.app.locals;
        res.render("home", context);
    },
    loginForm: function (req, res) {
        const {context} = req.app.locals;
        res.render("login", context);
    },
    registerForm: function (req, res) {
        const {context} = req.app.locals;
        res.render("register", context)
    },
    sharedTripps: async function (req, res) {
        const {context} = req.app.locals;
        const tripps = await models.Tripp.find({}).lean();
        context.tripps = tripps;

        res.render("sharedTripps", context);
    },
    offerTrippPage: function (req, res) {
        const {context} = req.app.locals;

        res.render("offerTripp", context);
    },
    logOutUser: async function (req, res) {
        const {context} = req.app.locals;

        res.clearCookie("aid")
            .redirect("/");
    },
    registerUser: async function (req, res) {
        const {email, password} = req.body;
        try {
            const validationResult = validators.isValidEmail(email) &&
                validators.isValidPassword(password);

            if (validationResult) {
                const hashedPassword =
                    await bcrypt.hash(password, 10);
                const newUser = new models.User({email, password: hashedPassword});
                const userObject = await newUser.save();
                const token = generateUserJWT(userObject);
                res.cookie("aid", token, {signed: true}).redirect("/");
            }

        } catch (e) {
            res.status(400)
                .render("register",
                    {isLoggedIn: false, error: true, errorMessage: e.message});
        }
    },
    logInUser: async function (req, res) {
        const {email, password} = req.body;
        try {
            const validationResult = validators.isValidPassword(password) &&
                validators.isValidEmail(email);
            if (validationResult) {
                const targetUser = await models.User.findOne({email}).exec();
                const isValidPassword = await bcrypt.compare(password, targetUser.password || "");
                if (!isValidPassword) {
                    throw new Error("Invalid credentials!");
                }

                const token = generateUserJWT(targetUser);
                res.cookie("aid", token, {signed: true}).redirect("/");

                console.log(`USER :: ${targetUser.email} :: has logged in!`);

            }
        } catch (e) {
            res.status(400)
                .render("login",
                    {error: true, errorMessage: e.message});
        }
    },
    offerTripp: async function (req, res) {
        const {context} = req.app.locals;
        const {trippRoute, dateTime, imageURL, seats, description} = req.body;
        try {
            const validationResult =
                validators.isValidDestination(trippRoute) &&
                validators.isValidDate(dateTime) &&
                validators.isValidURL(imageURL) &&
                validators.validateSeats(Number(seats)) &&
                description.trim() !== "";

            if (validationResult) {
                const newTripp = new models.Tripp({
                    trippRoute,
                    dateTime,
                    imageURL,
                    seats: Number(seats),
                    description,
                    buddies: [],
                    creatorId: context.email
                });

                newTripp.save();
                res.redirect("/shared-tripps");
                return;
            }

            throw new Error("Invalid date!");
        } catch (e) {
            const formData = {trippRoute, dateTime, imageURL, seats, description};

            res.render("offerTripp", {error: true, errorMessage: e.message, formData, ...context});
        }


    },
    trippDetailsPage: async function (req, res) {
        const {_id} = req.params;
        const {context} = req.app.locals;
        try {

            const targetTripp = await models.Tripp.findOne({_id}).lean();
            const trippContext = {};
            trippContext.isCreator = targetTripp.creatorId === context.email;
            trippContext.availableSeats = targetTripp.availableSeats;
            trippContext.areSeatsLeft = targetTripp.availableSeats > 0;
            trippContext.alreadyJoined = targetTripp.buddies.some(b => {
                return b.email === context.email;
            });
            trippContext.trippRoute = targetTripp.trippRoute;
            trippContext.buddies = targetTripp.buddies;
            trippContext.dateTime = targetTripp.dateTime;
            trippContext.imageURL = targetTripp.imageURL;
            trippContext.seats=targetTripp.seats;
            trippContext.description=targetTripp.description;
            trippContext.creatorId=targetTripp.creatorId;
            trippContext.availableSeats=targetTripp.availableSeats;
            trippContext._id = targetTripp._id;
            context.trippContext = trippContext;


            res.render("trippDetails",context);
        } catch (e) {
            console.log("SOME ERROR OCCURRED :: ",e.message);
            res.redirect("/");
        }
    },
    joinTripp:async function(req,res){
        const {_id} = req.params;

        const targetTripp = await models.Tripp.findOne({_id});

        if(!targetTripp.buddies.includes(req.app.locals.context.email)){
            targetTripp.buddies.push(req.app.locals.context.email);
            targetTripp.save();
            res.redirect(`/details/${_id}`);
            return;
        }
        res.redirect("back");
        return;

    }
}