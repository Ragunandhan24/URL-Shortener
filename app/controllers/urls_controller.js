const express = require('express');
const router = express.Router();
const {logger}= require('../middlewares/logger');
const fs = require('fs');
const morgan = require('morgan');
const ip=require('ip')
const useragent=require('express-useragent');
const {Url} = require('../models/url');
const {reqDetails} = require('../middlewares/user-agent');
router.use(useragent.express());
router.use(morgan('STARTED :method :url for :ip at :date[clf] COMPLETED :status OK - :response-time ms', {stream: fs.createWriteStream('./access.log', { flags: 'a' })}));

router.use(morgan('STARTED :method :url for :ip at :date[clf] COMPLETED :status OK - :response-time ms'));

morgan.token('ip', function(req, res) {return ip.address()});
// var accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })


router.get('/',(req,res)=>{

    Url.find().then((urls)=>{
        res.send(urls)
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/:hash',reqDetails, (req,res)=>{
    let hash=req.params.hash;
    let useragent=res.useragent;
    Url.findOne({hashedUrl: hash}).then((url)=>{
        
        return url.generateClicks(useragent);
        
    }).then((url)=>{
        res.send(url);
    }).catch((err)=>{
        res.send(err)
    })
    
})

router.post('/',(req,res)=>{
    let body=req.body;
    let userDetails=req.useragent;
    console.log(userDetails);
    // let add=ip.address();
    let url = new Url (body);
    url.save().then((url)=>{
        res.send({
            url, notice:'success'
        });
    }).catch((err)=>{
        res.send(err);
    });
})


 module.exports={
     urlsController:router
 }