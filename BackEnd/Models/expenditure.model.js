import mongoose from 'mongoose';

 
const expenditureSchema  = new mongoose.Schema({
     name: {
        type: String,
        require: true
     },
     amount:{
        type: Number,
        require: true
     },
     date: {
        type: Date,
        require: true
     },
     categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryAndPrice'
     }
});

const Expenditure =  mongoose.model('expenditure', expenditureSchema)

export default Expenditure