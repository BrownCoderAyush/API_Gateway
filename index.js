const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware} = require('http-proxy-middleware');
const { isAuthenticated } = require('./authentication_middleware');


const app = express();
const PORT = 3005;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})

// log the request details 
app.use(morgan('combined'));


app.use(limiter);

app.use('/bookingservice' , isAuthenticated);


app.use('/bookingservice' , createProxyMiddleware({ target : 'http://localhost:3002/' , changeOrigin:true}));


app.listen(PORT , async()=>{
    console.log(`Server started at port ${PORT}`);
})
