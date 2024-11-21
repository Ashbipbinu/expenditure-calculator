import CategoryAndPrice from "../Models/expense.model.js";

export const categoryContoller = async (req, res, next) => {
  try {
    const categoryAndPrice = await CategoryAndPrice.create(req.body);
    return res.status(200).json(categoryAndPrice);
  } catch (error) {
    next(error);
  }
};

export const getAllCategoryContoller = async (req, res, next) => {
  try {

    const allCategories = await CategoryAndPrice.find();
    let categories = allCategories.reduce((acc, curr) => {
        return [...acc, curr.category]
    }, [])
    res.status(200).json(categories)
    
  } catch (error) {
    next(error);
  }
};
