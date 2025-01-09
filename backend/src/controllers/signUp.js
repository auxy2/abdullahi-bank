import { error, success } from "../helpers/response.js"
import asyncWrapper from "../middlewares/async.js"
import User from "../models/user.js";
import { BadRequestError } from "../utils/error/custom.js";


export const signUp = asyncWrapper(async(req, res, next) => {
    try{
        const { body } = req;
        console.log(body);
        const isUser = await User.findOne({ email: body.email });
        if(isUser) {
            console.log(isUser)
            throw new BadRequestError("there is an existing user with this email")
        }
        const user = await User.create(body);
        return success(res, 201, user);
    }catch(e){
        return error(res, e?.statusCode || 500, e)
        
    }
})