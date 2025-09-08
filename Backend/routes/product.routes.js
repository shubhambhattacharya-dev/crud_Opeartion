import express from 'express'

import { getProducts , createProduct ,updateProduct ,deleteProduct } from '../Controller/product.controller.js';


const router=express.Router();

// Get all products
router.get("/", getProducts);

// Create new product
router.post("/", createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;