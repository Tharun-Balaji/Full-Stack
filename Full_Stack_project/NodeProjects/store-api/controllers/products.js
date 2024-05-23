const product = require("../models/product");


const getAllProductsStatic = async (req, res, next) => { 
    const products = await product.find({
        
    })
    res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res, next) => {
    const { featured, company, name } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    };
    if (company) { 
        queryObject.company = company;
    };
    if (name) { 
        queryObject.name = name;
    };
    console.log(queryObject);
    const products = await product.find(queryObject);
    res.status(200).json({ products, nbHits: products.length});
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};