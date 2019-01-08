const express= require('express');
const app  = express();
const port = 3000;
app.use(express.json());

const {mongoose} = require('./config/db')

const {routes} = require ('./config/routes')
app.use('/', routes);

app.listen(port, function() {
    console.log('listening to port ', port);
})