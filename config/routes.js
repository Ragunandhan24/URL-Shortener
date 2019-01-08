const express=require('express');
const router=express.Router();
const {urlsController} = require('../app/controllers/urls_controller');


module.exports= {
    routes : router
}

router.use('/url',urlsController);