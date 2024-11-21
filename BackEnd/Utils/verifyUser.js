import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token
    console.log("enter verify user", token)
    if(!token){
        return next(401, "Unauthorized user")
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                next(401, "Forbidden")
            }

            req.user = user
        })
    } catch (error) {
        next(error)
    }
}