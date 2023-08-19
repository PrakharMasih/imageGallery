const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


mongoose.connect('mongodb://0.0.0.0:27017/memories').then(output => {

    // var sessionss;

    // var sessionChecker = (req, res, next) => {
    //     if (req.session.profile) {
    //         console.log(`Found User Session`.green);
    //         next();
    //     } else {
    //         console.log(`No User Session Found`.red);
    //         res.redirect('/login');
    //     }
    // };


    app.use(cors());
    app.use(express.json());

    const authRoutes = require('./api/router/authRouter');
    const imageRoutes = require('./api/router/imageRouter');


    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        })
    );


    
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', imageRoutes);


//404
    app.use((req, res, next) =>{
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
