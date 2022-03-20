const express = require("express");
const http = require("http");
const mongodb = require("mongodb");

const app = express();

const PORT = process.env.PORT;

// Configures the connection to the video-storage microservice
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
// Specifies the database server to connect to
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

function main() {
    // Connects to the database server
    return mongodb.MongoClient.connect(DBHOST)
        .then(client => {
            const db = client.db(DBNAME);
            const videosCollection = db.collection("videos");

    // GET request to the video route to the video-storage microservice
            app.get("/video", (req, res) => {
                const videoId = new mongodb.ObjectID(req.query.id);
                videosCollection.findOne({ _id: videoId }).then(videoRecord => {
                    if (!videoRecord) {
                        res.sendStatus(404);
                        return;
                    }
                    const forwardRequest = http.request({
                            host: VIDEO_STORAGE_HOST,
                            port: VIDEO_STORAGE_PORT,
                            path:`/video?path=${videoRecord.videoPath}`,
                            method: 'GET',
                            headers: req.headers
                        },

                        forwardResponse => {
                            res.writeHeader(forwardResponse.statusCode,forwardResponse.headers);
                            forwardResponse.pipe(res);
                        });
                    req.pipe(forwardRequest);
                })
                .catch(err => {
                    console.error("Database query failed.");
                    console.error(err && err.stack || err);
                    res.sendStatus(500);
                });
            });
            app.listen(PORT, () => {
                console.log(`Microservice online.`);
            });
        });
}

// Starts the microservice
main()
    .then(() => console.log("Microservice online."))
    .catch(err => {console.error("Microservice failed to start.");
    console.error(err && err.stack || err);
});