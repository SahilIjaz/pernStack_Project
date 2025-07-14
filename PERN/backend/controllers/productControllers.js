import {sql} from '../config/db.js';

export const createProduct = async (req,res)=>{
    try {
        
        const {name,image,price}=req.body;
        if(!name || !image || !price){
            return res.status(400).json({message: 'All fields are required'});
        }
        
        console.log('field are',{name,image,price});
        const newProduct = await sql `
        insert into products(name,image,price)
        values (${name},${image},${price})
        returning *`

        res.status(200).json({
            message:'New product created successfully.',
            status:200,
            data: newProduct[0]
        })
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error',error});
        
    }
}

export const getProdcuts = async (req,res,)=>{
    try {
        const products= await sql`select * from products order by created_at desc`

        res.status(200).json({
            message:'Products found successfully.',
            status:200,
            length: products.length,
            data:products
        })
        
    } catch (error) {
          console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteProductById = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: 'Product ID is required'});
        }

        const deletedProduct = await sql`delete from products where id=${id} returning *`;

        if(deletedProduct.length === 0){
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(201).json({
            message:'Product deleted successfully.',
            status:201,
            data: deletedProduct[0]
        })
        
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const updateProductById = async(req,res)=>{
    console.log('IN UPDATE PRODUCT BY ID');
    try {
        const {id} = req.params;
        const {name, image, price} = req.body;

        if(!id || !name || !image || !price){
            return res.status(400).json({message: 'All fields are required'});
        }

        const updatedProduct = await sql`
        update products
        set name=${name}, image=${image}, price=${price}
        where id=${id}
        returning *`;

        if(updatedProduct.length === 0){
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json({
            message:'Product updated successfully.',
            status:200,
            data: updatedProduct[0]
        })
        
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await sql`select * from products where id=${id}`;

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product found successfully.',
            status: 200,
            data: product[0]
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
