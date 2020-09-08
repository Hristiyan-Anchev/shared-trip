const connectionURI = process.env.DB_HOST
const mongoose = require("mongoose");


mongoose.connect(connectionURI,{useNewUrlParser: true});

const db = mongoose.connection;
db.on("error",function(err){
    console.log("### DB CONNECTION ERROR OCCURRED ::: ", err.message);
});

db.on("open",function(){
    console.log("### DB CONNECTION ESTABLISHED ")
});

module.exports = {mongoose};