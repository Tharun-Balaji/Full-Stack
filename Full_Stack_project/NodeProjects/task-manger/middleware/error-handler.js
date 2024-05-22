
function errorHandlerMiddleware(err,req, res, next) { 
    return res.status(500).json({ meg: err });
};

module.exports = errorHandlerMiddleware;