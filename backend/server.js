
const express = require('express');
const app = express();
const path = require('path')
const {StatusCodes} = require('http-status-codes')
const PORT = process.env.PORT || 3500;

/**********************************
 *       ROUTES SECTION START     *
 ***********************************/

// Added styling for better UI
app.use('/', express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})