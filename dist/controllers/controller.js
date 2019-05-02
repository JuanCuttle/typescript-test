"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./../category");
// GET - /categories get all categories
exports.allCategories = (req, res) => {
    let categories = category_1.default.find((err, categories) => {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        else {
            console.log("Success");
            res.send(categories);
        }
    });
};
// GET - /categories/:id get category by id
exports.getCategory = (req, res) => {
    let category = category_1.default.find({ id: req.params.categoryId }, (err, category) => {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        else {
            console.log("Success");
            res.send(category);
        }
    });
};
// Being called by HTTP POST for backend challenge
// PUT - /categories inserts new category
exports.addCategory = (req, res) => {
    //var category = new Category(req.body);
    const category = new category_1.default({
        //_id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        name: req.body.name,
        childrenIds: req.body.childrenIds
    });
    let categoryDB = category_1.default.find({ id: category.id }, (err, categoryDB) => {
        // If category already exists, returns false
        if (categoryDB.length == 0) {
            // Check if children exist
            let childrenCategories = category_1.default.find({ id: req.body.childrenIds }, (err, childrenCategories) => {
                const cIds = req.body.childrenIds;
                console.log(cIds);
                console.log(childrenCategories.length);
                // If all children exist, all children Id's will be in the database
                if (cIds.length === childrenCategories.length) {
                    category.save((err) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            //res.send(category)
                            res.send({ 'ok': true });
                        }
                    });
                }
                else {
                    res.send({ ok: false, error: "Not all children exist" });
                }
            });
        }
        else {
            res.send({ 'ok': false, 'error': "Category already exists" });
        }
    });
};
// DELETE - /category/:id deletes one category
exports.deleteCategory = (req, res) => {
    category_1.default.deleteOne({ id: req.params.categoryId }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ 'ok': true });
        }
    });
};
// deprecated
// POST - /category/:id updates one category
exports.updateCategory = (req, res) => {
    category_1.default.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ 'ok': true });
        }
    });
};
//# sourceMappingURL=controller.js.map