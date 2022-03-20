const express = require("express");
const http = require("http");

const app = express();

const PORT = process.env.PORT;

// Configures the connection to the video-storage microservice
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

// GET request to the video route to the video-storage microservice
app.get("/video", (req, res) => {
    const forwardRequest = http.request({
        host: VIDEO_STORAGE_HOST,
        port: VIDEO_STORAGE_PORT,
        path:'/video?path=SampleVideo_1280x720_1mb.mp4',
        method: 'GET',
        headers: req.headers
    },
    forwardResponse => {
        res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
        forwardResponse.pipe(res);
    });
    req.pipe(forwardRequest);
});

app.listen(PORT, () => {
    console.log(`Microservice online`);
});