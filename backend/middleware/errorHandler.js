/**
 * An error function to handle any type of error that is not described in the 
 * code. Purpose of this function is to just send the error message and not the 
 * full error to prevent sending sensitive information.
 * @param {*} err errors that have occurred
 * @param {*} req upcoming requests from user
 * @param {*} res response of the server
 * @param {*} next to move the code to the next middleware
 */
const errorHandler = (err, req, res, next) => {

// Log the full error for debugging
    console.error(err); 

// Set the status code, defaulting to 500 for server errors
    const status = res.statusCode ? res.statusCode: 500; 

    res.status(status);

    res.json({ message: err.message || 'An unexpected error occurred'});
};

module.exports = errorHandler;