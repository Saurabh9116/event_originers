// import express from 'express';
// import { upload } from '../configs/multer.js';
// import authSeller from '../middlewares/authSeller.js';
// import { 
//     addProduct, 
//     changeStock, 
//     productById, 
//     productList,
//     updateProductPrice  // ✅ import the new controller
// } from '../controllers/productController.js';

// const productRouter = express.Router();

// productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
// productRouter.get('/list', productList);
// productRouter.get('/id', productById);
// productRouter.post('/stock', authSeller, changeStock);

// // ✅ New route to update product price
// productRouter.put('/:id', authSeller, updateProductPrice);

// export default productRouter;



import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
  updateProductPrice, // ✅ import the new controller
} from "../controllers/productController.js";

const productRouter = express.Router();

// ✅ Add product (seller only)
productRouter.post("/add", upload.array("images"), authSeller, addProduct);

// ✅ Get all products (users + sellers)
productRouter.get("/list", productList);

// ✅ Get single product by ID
// Changed to use params for RESTful URL: /api/product/:id
productRouter.get("/:id", productById);

// ✅ Change product stock (seller only)
productRouter.post("/stock", authSeller, changeStock);

// ✅ Update product price (seller only)
productRouter.put("/:id/price", authSeller, updateProductPrice);

export default productRouter;
