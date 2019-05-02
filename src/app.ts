import * as express from "express";
import * as categoryController from './controllers/controller';
import * as bodyParser from 'body-parser';

const app = express();
app.set("port", 3000);

app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
    res.send("Hello, Brebs");
});

app.get('/categories', categoryController.allCategories);

app.get('/categories/:categoryId', categoryController.getCategory);

//app.put('/categories', categoryController.addCategory);

app.delete('/categories/:categoryId', categoryController.deleteCategory);

app.post('/categories', categoryController.addCategory);

app.listen(app.get("port"), () => {
    console.log("App is running on http://localhost:%d", app.get("port"))
})