const express = require('express');

// Loads the (built-in) fs library so we can use the Node.js filesystem API.
const fs = require("fs");

const app = express();

// Throws an error when the required environment variable isn’t supplied.
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

// command: export PORT=3000
const PORT = process.env.PORT;

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
app.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video`);
});