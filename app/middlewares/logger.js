const morgan = require('morgan');
const {Url} =require('../models/url');

const express = require('express');
const router = express.Router();
// router.use(morgan('combined'));

const logger = (req, res, next) => {
    console.log('inside logger')
    morgan('combined');
    next();
}

module.exports={
    logger
}