import { error, success } from "../helpers/response.js";
import asyncWrapper from "../middlewares/async.js";
import { banks, verifyAccount } from "../servicces/paystack.js";
import { BadRequestError } from "../utils/error/custom.js";


export const listBanks = asyncWrapper(async(req, res) => {
    try{
        const avalableBanks = await banks();
        if(!avalableBanks)
            throw new BadRequestError('Issue getting available Banks');

        return success(res, 200, undefined, avalableBanks)
    }catch(e){
        return error(res, e?.statusCode || 500, e)
    }
})

export const validateAccount = asyncWrapper(async(req, res) => {
    try{
        const { 
            body: { bankCode, accountNumber }
        } = req;
        if(!bankCode || !accountNumber){
            throw new BadRequestError('Please provide account number and bank');
        }
        const accDeatails = await verifyAccount(req.body);
        console.log("accDeatails", accDeatails);
        return success(res, 200, undefined, accDeatails);
    }catch(e){
        return error(res, e?.statusCode || 500, e)
    }
})