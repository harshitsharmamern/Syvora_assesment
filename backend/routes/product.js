const express = require("express");
const app = express.Router();
const Product  = require("../Model/Product")

app.get('/getItem',async(req,res)=>{
    try{
        const data = await Product.find({});
        return res.json({status:true,AllProduct: data})
    }catch(err){
        return res.json(err)
    }
})
///
app.post('/addItem',async(req,res)=>{
    
    const {Name,description,price} = req.body;
    console.log(req.body);

    try{
        
       const data = await Product.create({Name, description, price})
       return res.json({status:true, data})
    
    }catch(err){
        return res.json(err)
    }
})

app.put('/updateItem/:id',async(req,res)=>{
    const _id = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(_id,req.body, {
            new: true, 
        });

        if (!updatedProduct) {
            return res.json({ status: false , message: 'Product not found' });
        }

        res.json({ status:true,
            message: 'Product updated successfully',
        });
    } catch (error) {
        res.json({status:false, message: 'Error updating product', error });
    }
    })

    app.delete('/deleteItem/:id',async(req,res)=>{
        const _id = req.params.id;
        try {
            const deletedProduct = await Product.findByIdAndDelete(_id);
    
            if (!deletedProduct) {
                return res.json({ status: false , message: 'Product not found' });
            }
    
            res.json({ status:true,
                message: 'Product deleted successfully',
            });
        } catch (error) {
            res.json({status:false, message: 'Error deleting product', error });
        }
    })

module.exports = app;
