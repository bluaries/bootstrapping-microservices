const express = require('express');

const app = express();

// listen on port 3000
const port = 3000;

// Creates a handler for the main HTTP route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Initiates the HTTP server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});