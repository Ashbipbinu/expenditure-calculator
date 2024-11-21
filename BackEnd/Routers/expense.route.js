import express from 'express'
import { categoryContoller, getAllCategoryContoller } from '../Controllers/expense.controller.js';

const router = express.Router();

router.post('/category', categoryContoller)
router.get('/all-category', getAllCategoryContoller)


export default router