const jwt = require('jsonwebtoken');

module.exports = function(request,response,next){
    try {
      const token = request.headers.authorization.split(" ")[1];
      const decodedToke = jwt.verify(token, process.env.jwt_secret);
      request.body.userId = decodedToke.userId;
      next();
    } catch (error) {
        response.status(401).send({
            success : false,
            message : "Invalid token"
        })
        return;
    }
}