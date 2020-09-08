const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

module.exports = {
    generateUserJWT: function(targetUserObject){

          const token = jwt.sign({
              isLoggedIn:true,

            email:targetUserObject.email,
            _id:targetUserObject._id
        },jwtsecret,{algorithm:"HS256"});

        return token
    }

};