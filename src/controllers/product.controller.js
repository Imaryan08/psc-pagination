const Product = require('../models/product.model');
const express = require('express');
const router = express.Router();


router.get('/', async(req,res) => {
  try {

    const page = req.query.page;
    const pagesize = req.query.pagesize;

    const skip = (page - 1 ) * pagesize;

    // page 1 : 1 - 1 = 0 * 30 = 0
    //! page 2 : 2 - 1 = 1 * 30 = 30 
    //? page 3 : 3 - 1 = 2 * 30 = 60 

    const products = await Product.find().skip(skip).limit(pagesize).lean().exec();
    const totalpages = Math.ceil(await Product.find().countDocuments()/pagesize);
    return res.status(200).send({products,totalpages});
  } catch (error) {
    return res.status(500).send(error.message);
  }
})


module.exports = router;
