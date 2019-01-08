const express = require('express');
const router=express.Router();
const {Url} =require('../models/url');
var useragent = require('express-useragent');
 
router.use(useragent.express());
const reqDetails = (req,res, next)=>{
    // console.log('inside reqdetaisl')
    res.useragent=req.useragent;
    next();
}

module.exports={
    reqDetails
}