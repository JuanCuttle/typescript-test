"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const categoryController = require("./controllers/controller");
const bodyParser = require("body-parser");
const app = express();
app.set("port", 3000);
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Hello, Brebs");
});
app.get('/categories', categoryController.allCategories);
app.get('/categories/:categoryId', categoryController.getCategory);
//app.put('/categories', categoryController.addCategory);
app.delete('/categories/:categoryId', categoryController.deleteCategory);
app.post('/categories', categoryController.addCategory);
app.listen(app.get("port"), () => {
    console.log("App is running on http://localhost:%d", app.get("port"));
});
//# sourceMappingURL=app.js.map