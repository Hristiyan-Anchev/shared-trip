const schemas = require("./schemas");
const mongoose = require("mongoose");

const User = mongoose.model("user",schemas.userSchema);
const Tripp = mongoose.model("tripp",schemas.tripSchema);


module.exports = {
    User,Tripp
};