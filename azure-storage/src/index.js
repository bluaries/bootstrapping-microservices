const express = require("express");
// Loads the azure-storage package
const azure = require('azure-storage');

const app = express();
const PORT = process.env.PORT;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;

// Helper function that connects to the azure-storage API
function createBlobService() {
    const blobService = azure.createBlobService(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
    return blobService;
}

// Specifies the path to the video in storage
app.get("/video", (req, res) => {
    const videoPath = req.query.path;
    const blobService = createBlobService();
    const containerName = "videos";

    // Retrieves the video’s properties from Azure storage
    blobService.getBlobProperties(containerName, 
        videoPath, (err, properties) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.writeHead(200, {
            "Content-Length": properties.contentLength,
            "Content-Type": "video/mp4",
        });

        // Streams the video from Azure storage to the HTTP response
        blobService.getBlobToStream(containerName, videoPath, res, err => {
            if (err) {
                res.sendStatus(500);
                return;
            }
        });
    });
});
    
app.listen(PORT, () => {
    console.log(`Microservice online`);
});
