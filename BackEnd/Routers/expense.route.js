import express from "express";
import {
  categoryContoller,
  getAllCategoryContoller,
  deleteCategory,
  addNewExpenseController,
  getSummary
} from "../Controllers/expense.controller.js";

const router = express.Router();

router.post("/category", categoryContoller);
router.get("/all-category", getAllCategoryContoller);
router.get("/delete/:id", deleteCategory);
router.post("/new-expense", addNewExpenseController);
router.get('/get-summary', getSummary)

export default router;
