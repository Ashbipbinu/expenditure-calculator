import express from 'express';
import { userSignUpController, userLoginController } from '../Controllers/auth.controller.js';

const router = express.Router();
console.log("entered")
router.post('/signup', userSignUpController) ;
router.post('/login', userLoginController)

export default router;