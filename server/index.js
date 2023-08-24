const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://0.0.0.0:27017/memories').then(output => {

    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({ extended: false }));     //only parses urlencoded bodies
    app.use(bodyParser.json());

    var options = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
    app.use(cors(options));


    const imageRoutes = require('./api/router/imageRouter');
    const usersRouter = require('./api/router/userRouter')


    app.use('/api/auth', usersRouter);
    app.use('/api/posts', imageRoutes);


    //404
    app.use((req, res, next) => {
        const error = new Error('Page Not found');
        error.status = 404;
        next(error);
    });

    //500
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            message: error.message
        });
    });

    app.listen(8000, () => {
        console.log('server live on 8000')
    });
})
    .catch(err =>
        console.log(err)
    );
