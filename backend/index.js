require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes_products = require('./routes/routes_products.js');
const routes_upload = require('./routes/routes_upload.js');
const routes_users = require('./routes/routes_users.js');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Routes
app.use('/images', express.static('upload/images'));
app.use('/api/products', routes_products);
app.use('/api/upload', routes_upload);
app.use('/api/users', routes_users);


// Database Connection with MongoDB & Running Server
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log(`Database connected: ${mongoose.connection.host}`);
        return app.listen(PORT)
    })
    .then(() => {
        console.log(`Server Running on PORT ${PORT}`);
    })
    .catch((error) => {
        console.log(error);
    });
