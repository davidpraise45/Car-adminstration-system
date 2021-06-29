var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoDb = require('./database/db');
var createError = require('http-errors');

const buyerRoute = require('./routes/buyer.routes');
const carRoute = require('./routes/car.routes');
const customerRoute = require('./routes/customer.routes');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Database successfully connected");
}, error => {
    console.log("Database error: "+error);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// enable path to the static directory
app.use(express.static(path.join(__dirname, 'dist/car-management')));

// define the api root
app.use('/api', buyerRoute);
app.use('/api', carRoute);
app.use('/api', customerRoute);

// define the port
const port = process.env.PORT || 13000;

app.listen(port, () => {
    console.log('Listening on port: '+port);
})

// define a 404 error handler
app.use((req, res, next) => {
    next(createError(404));
});

// define route
app.get("/", (req, res) => {
   res.send("Invalid endpoint"); 
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/car-management/index.html')); 
});


// define the error handler
app.use(function(err, req, res, next){
    console.log(err.message);
    if(!err.statusCode){
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
});
