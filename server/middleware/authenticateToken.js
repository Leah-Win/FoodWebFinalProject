import express from 'express'
import 'dotenv/config'
import jwt from 'jsonwebtoken'


    function create(userId) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: userId,
        }

        const token = jwt.sign(data, jwtSecretKey);
  console.log(token,"  token")
        return token;
    }
    // });

    // Verification of JWT
    // app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
    function verifyJWTToken(req, res, next) {
        

        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        try {
            const token = req.header(tokenHeaderKey);
            
        
        console.log(token)
            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                console.log("succcess")
                next();
            } else {
                // Access Denied
                console.log("error")
                return res.status(401).send(error);
            }
        } catch (error) {
            // Access Denied
            console.log("error")
            return res.status(401).send(error);
        }
    }
    // });
export{
    verifyJWTToken,
    create
}