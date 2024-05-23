

const getAllProductsStatic = async (req, res, next) => { 
    throw new Error("testing async error")
    res.status(200).json({ msg: 'Products testing route' });
};

const getAllProducts = async (req, res, next) => {
    res.status(200).json({ msg: 'Products route' });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};