import { error } from "../helpers/response.js"
import asyncWrapper from "../middlewares/async.js"


export const signUp = asyncWrapper(async(req, res, next) => {
    try{
        const { body } = req;
        const user = await User.create()
    }catch(e){
        return error(res, e?.statusCode || 500, e)
        
    }
})