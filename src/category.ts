import * as mongoose from 'mongoose';
let dotenv = require('dotenv');
dotenv.config();
const {mongoURI} = require('./config');


const uri: string = mongoURI;//'mongodb://127.0.0.1:27017/local';//process.env.mongoURI;

mongoose.connect(uri, {useNewUrlParser: true}, (err: any) => {
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