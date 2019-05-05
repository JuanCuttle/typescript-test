import {Request, Response} from 'express';
import Category from './../category';

// GET - /categories get all categories
export let allCategories = (req: Request, res: Response) => {
    let categories = Category.find((err: any, categories: any) => {
        if (err){
            console.log(err.message)
            res.send(err)
        } else {
            //console.log("Success")
            res.send(categories)
        }
    })
}

// GET - /categories/:id get category by id
export let getCategory = (req: Request, res: Response) => {
    let category = Category.find({id: req.params.categoryId}, (err: any, category: any) => {//findById(req.params.categoryId, (err: any, category: any) => {
        if (err){
            console.log(err.message)
            res.send(err)
        } else {
            //console.log("Success")
            res.send(category)
        }
    })
}

// Being called by HTTP POST for backend challenge
// PUT - /categories inserts new category
export let addCategory = (req: Request, res: Response) => {
    //var category = new Category(req.body);
    const category = new Category({ // Extract JSON category object from request
		//_id: new mongoose.Types.ObjectId(),
		id: req.body.id,
		name: req.body.name,
		childrenIds: req.body.childrenIds
    });

    let categoryDB = Category.find({id: category.id}, (err: any, categoryDB: any) => {
        // If category already exists, returns false
        if (categoryDB.length == 0){

            // Check if children exist
            let childrenCategories = Category.find({id: req.body.childrenIds}, (err: any, childrenCategories: any) => {
                const cIds = req.body.childrenIds;
                //console.log(cIds);
                //console.log(childrenCategories.length)

                // If all children exist, all children Id's will be in the database
                if (cIds.length === childrenCategories.length){
                    category.save((err: any) => {
                        if (err){
                            res.send(err)
                        } else {
                            //res.send(category)
                            res.send({'ok': true})
                        }
                    })  
                } else {
                    res.send({ok: false, error: "Not all children exist"})
                }
            })
        } else {
            res.send({'ok': false, 'error': "Category already exists"})
        }
    })
}

// DELETE - /category/:id deletes one category
export let deleteCategory = (req: Request, res: Response) => {
    Category.deleteOne({id: req.params.categoryId}, (err: any) => {
        if (err){
            res.send(err)
        } else {
            res.send({'ok': true})
        }
    })
}

// deprecated
// POST - /category/:id updates one category
export let updateCategory = (req: Request, res: Response) => {
    Category.findByIdAndUpdate(req.params.id, req.body, (err: any, category: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send({'ok': true})
        }
    })
}