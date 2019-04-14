import jwt from 'jsonwebtoken';

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        jwt.verify(token, process.env.JWT_KEY || 'recipe', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
}

module.exports = checkToken;