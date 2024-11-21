import express from 'express'
import { getUserByIdController, deleteUserController, updateUserController } from '../Controllers/user.controller.js';
import { verifyUser } from '../Utils/verifyUser.js';

const router = express.Router();

router.get('/get/:id', getUserByIdController)
router.get('/delete/:id', deleteUserController)
router.post('/update/:id', updateUserController)


export default router