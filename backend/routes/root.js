const express = require('express');
const router = express.Router();
const path = require('path');

// requesting root url can be either '/', '/index' or '/index.html' 
router.get('^/$|index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

module.exports = router;