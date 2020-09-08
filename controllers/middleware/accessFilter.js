module.exports ={
    protectRoute:function(req,res,next){
        const {context} = req.app.locals;
        if(context.isLoggedIn === true){
            next();
            return ;
        }

        res.redirect("/");
    }
}