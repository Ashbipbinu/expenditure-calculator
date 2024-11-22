import Expenditure from "../Models/expenditure.model.js";
import CategoryAndPrice from "../Models/expense.model.js";

export const categoryContoller = async (req, res, next) => {
  try {
    const categoryAndPrice = await CategoryAndPrice.create(req.body);
    categoryAndPrice.save()
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
    if (deletedCategory) {
      return res.status(200).json(deleteCategory);
    }
  } catch (error) {
    next(error);
  }
};

export const addNewExpenseController = async (req, res, next) => {
  try {
    const addNewExpense = await Expenditure.create(req.body);
    return res.status(201).json(addNewExpense)
  } catch (error) {
    next(error) 
  }
}

export const getSummary = async (req, res, next) => {
  try {
    let summaryDetails = {}
    const tableDetails = await Expenditure.find() 

    if(tableDetails){
      summaryDetails = {tableDetails}
    }

    const totalAmount =  await Expenditure.aggregate([
      {
        $group: {
          _id: null,
          totalAmount : {$sum : "$amount"}
        }
      }
    ])

    const totalAmt = totalAmount[0].totalAmount
    if(totalAmt){
      summaryDetails.totalAmount = totalAmt
    }else{
      summaryDetails.totalAmount = 0
    }

    const sortedData = tableDetails.sort((a, b) => new Date(a.date) - new Date(b.date))
    const latest = sortedData[tableDetails.length - 1]
    const oldest = sortedData[0]

    if(oldest || latest){
        summaryDetails.latest = latest
        summaryDetails.oldest = oldest
      }

      const result = tableDetails.reduce((acc, curr) => {
        const existingCategory = acc.find(category => category.label === curr.categories)
        if (existingCategory) {
          existingCategory.data.push(curr.amount)
        } else {
          acc.push({ label: curr.categories, data: [curr.amount] })
        }
        return acc
      }, [])
     
      if(result){
        summaryDetails.tableData = result
      }

      let data = tableDetails
      
      const labels = [...new Set(data.map(item => item.categories))]
      
      const datasets = labels.map(label => {
        const amounts = data.filter(item => item.categories === label).map(item => item.amount)
        const total = amounts.reduce((acc, curr) => acc + curr, 0)
        const percentage = (total /  summaryDetails.totalAmount) * 100
        return { label, data: [percentage] }
      })
      
      const transformedData = {
        type: 'pie',
        data: {
          labels,
          datasets
        }
      }

      if(transformedData){
        summaryDetails.pieDetails = transformedData
      }

      

    return res.status(201).json(summaryDetails)
  } catch (error) {
    next(error)
  }
}
