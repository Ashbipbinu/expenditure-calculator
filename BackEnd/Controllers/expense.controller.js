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
    res.status(200).json(allCategories);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const allCategories = await CategoryAndPrice.find()
    
    await CategoryAndPrice.findOneAndDelete({
      _id: req.params.id,
    });

    const deletedCategory = allCategories.filter((el, index) => allCategories.indexOf(el._id) === index)
    console.log('deletedCategory', deletedCategory)
    if (deletedCategory) {
      return res.status(200).json(deleteCategory);
    }
  } catch (error) {
    next(error);
  }
};
