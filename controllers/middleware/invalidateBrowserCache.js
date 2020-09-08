module.exports = {
    invalidateBrowserCache: function(req,res,next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    }
}