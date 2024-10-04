const express = require('express');
const app = express();
const path = require('path');
const {StatusCodes} = require('http-status-codes');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

/*******************************************
 *       MIDDLEWARE SECTION START          *
 ********************************************/

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

/*******************************************
 *       MIDDLEWARE SECTION END            *
 ********************************************/

/*******************************************
 *       ROUTES SECTION START              *
 ********************************************/
// Home page route for the API
app.use('/', require('./routes/root'));

// Error page if route does not exist
app.all('*', (req,res) => {
    res.status(StatusCodes.NOT_FOUND);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.send({ message: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
})

/*******************************************
 *       ROUTES SECTION END                *
 ********************************************/

// Error handler middleware (must be placed after all routes)
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})