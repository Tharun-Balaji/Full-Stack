const product = require("../models/product");


const getAllProductsStatic = async (req, res, next) => { 
    const products = await product.find({}).select("name price")
    res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res, next) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    };
    if (company) { 
        queryObject.company = company;
    };
    if (name) { 
        queryObject.name = { $regex: name, $options: "i" };
    };
    // console.log(queryObject);
    let result = product.find(queryObject);
    //Sort
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    if (fields) {
        const List = fields.split(",").join(" ");
        result = result.select(List);
    }

    const products = await result;
    res.status(200).json({ products, nbHits: products.length});
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};