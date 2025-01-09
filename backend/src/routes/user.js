import { Router } from "express";
import { login, signUp } from "../controllers/auth.js";
import { listBanks, validateAccount } from "../controllers/user.js";


const router = Router();

router.post('/signup',  signUp);
router.post('/login', login);

router.get('/banks', listBanks);
router.post('/account/verify', validateAccount);


export default router