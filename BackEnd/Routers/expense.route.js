import express from 'express'
import { categoryContoller, getAllCategoryContoller, deleteCategory } from '../Controllers/expense.controller.js';

const router = express.Router();

router.post('/category', categoryContoller)
router.get('/all-category', getAllCategoryContoller);
router.get('/delete/:id', deleteCategory)


export default router