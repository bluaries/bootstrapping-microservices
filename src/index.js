const express = require('express');

// Loads the (built-in) fs library so we can use the Node.js filesystem API.
const fs = require("fs");

const path = require("path");

const app = express();
const port = 3000;

// Defines the HTTP route for streaming video.
app.get("/video", (req, res) => {
    const videoPath = path.join("./videos", "SampleVideo_1280x720_1mb.mp4");

    // Retrieves the video file size.
    fs.stat(videoPath, (err, stats) => {

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
        fs.createReadStream(videoPath).pipe(res);
    });
});

// Initiates the HTTP server
app.listen(port, () => {
    console.log(`Microservice listening on port ${port}, point your browser at http://localhost:${port}/video`);
});