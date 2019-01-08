const mongoose=require('mongoose');
const shorthash=require('shorthash');
const ip=require('ip');
const userAgent=require('express-useragent');

const Schema=mongoose.Schema;

const urlSchema= new Schema ( {
    title: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required:true,
        trim:true,
        unique:true

    },
    tags:{
        type: Array,
        required:true

    },
    hashedUrl:{
        type: String,
        required:true
    },
    createdAt: {    
        type: Date,
        default: Date.now
    },
    clicks: [
        {
            clickedDate: {
                type: Date,
                default: Date.now
            },
            ip: {
                type: String,    
                default: function () {
                    return ip.address();
                }
            },
            browserName: {
                type: String
                
            },
            osType: {
                type: String,
                enum:['Macintosh','Windows','Linux']
            },
            deviceType: {
                type:String,
                enum:['Mobile', 'Desktop']
            } 
        } 
    ]

})

urlSchema.pre('validate',function(next) {
    let urls=this;
    let hash=shorthash.unique(urls.originalUrl.toString());
    urls.hashedUrl=hash;
    
    next();
});

urlSchema.methods.generateClicks=function(useragent) {
    const url=this;
    let clicksObj={
        browserName: useragent.browser,
        osType: useragent.isWindows ? 'Windows' : (useragent.isMac ? 'Macintosh' : 'Linux'),
        deviceType: useragent.isDesktop ? 'Desktop' : 'Mobile'
    }
    
    url.clicks.push(clicksObj);
    return url.save().then((url)=>{
        return  Promise.resolve(url);
    })
}


const Url=mongoose.model('url', urlSchema);

module.exports={
    Url
}