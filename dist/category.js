"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let dotenv = require('dotenv');
dotenv.config();
const { mongoURI } = require('./config');
const uri = mongoURI; //'mongodb://127.0.0.1:27017/local';//process.env.mongoURI;
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Successfully connected to MongoDB");
    }
});
exports.categorySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    childrenIds: { type: [Number], required: true }
});
const Category = mongoose.model('Category', exports.categorySchema);
exports.default = Category;
//# sourceMappingURL=category.js.map