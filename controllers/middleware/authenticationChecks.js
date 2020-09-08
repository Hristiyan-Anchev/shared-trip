const jwt = require("jsonwebtoken");


module.exports = {
    checkUserAuth: async function(req, res,next){
        const {context} = req.app.locals;
        const token = req.signedCookies["aid"];


        try {
            if(token){
              const decoded = await jwt.verify(token,process.env.JWT_SECRET) || undefined;
              context.isLoggedIn = true;
              //todo:  swap this for exact property assignment
              Object.assign(context,decoded);

            }else{
                context.isLoggedIn = false;

                console.log("no token");
            }
            next();
        }catch (e){
            console.log("AN ERROR OCCURRED :: ",e.message);
            context.isLoggedIn = false;
            next();
        }
    }
}