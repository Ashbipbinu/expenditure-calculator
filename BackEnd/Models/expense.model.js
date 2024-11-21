import mongoose from "mongoose";

const categoryAndPriceSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
        unique: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

const CategoryAndPrice = mongoose.model('category', categoryAndPriceSchema)

export default CategoryAndPrice