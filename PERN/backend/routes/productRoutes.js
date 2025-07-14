import express from 'express';
import { createProduct, getProdcuts, deleteProductById, updateProductById , getProductById } from '../controllers/productControllers.js';



const router = express.Router();


router.post('/create-product',createProduct)
router.get('/get-products', getProdcuts);
router.delete('/delete-product/:id', deleteProductById);
router.put('/update-product/:id', updateProductById);
router.get('/get-product/:id', getProductById);

export default router;