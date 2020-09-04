const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(morgan('tiny'));

if(process.env.NODE_ENV ==='production'){
	app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
