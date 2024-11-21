import express from 'express';
import { userSignUpController, userLoginController } from '../Controllers/auth.controller.js';

const router = express.Router();
router.post('/signup', userSignUpController) ;
router.post('/login', userLoginController);

export default router;