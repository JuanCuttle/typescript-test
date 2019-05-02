import * as mongoose from 'mongoose';

const uri: string = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(uri, (err: any) => {
    if (err){
        console.log(err.message)
    } else{
        console.log("Successfully connected to MongoDB")
    }
})

export const categorySchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type:String, required: true},
    childrenIds: {type: [Number], required: true}
})

const Category = mongoose.model('Category', categorySchema);
export default Category;