const express = require('express');

// Loads the (built-in) fs library so we can use the Node.js filesystem API.
const fs = require("fs");

const app = express();

// listen on port 3000
const port = 3000;

// Defines the HTTP route for streaming video.
app.get("/video", (req, res) => {
    const path = "../videos/SampleVideo_1280x720_1mb.mp4";

    // Retrieves the video file size.
    fs.stat(path, (err, stats) => {

        // Handles errors
        if (err) {
            console.error("An error occurred");
            res.sendStatus(500);
            return;
            }
            
        // Sends a response header to the web browser,
        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
            });

        // Streams the video to the web browser.
        fs.createReadStream(path).pipe(res);
    });
});

// Initiates the HTTP server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});