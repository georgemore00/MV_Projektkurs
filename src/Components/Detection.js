import React, { useRef } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "../App.css"

const Detection = () => {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);


    //Load bodyPix
    const runBodysegment = async () => {
        const net = await bodyPix.load();
        console.log("BodyPix model loaded");

        //Loop and detect bodypart
        setInterval(() => {
            detect(net);
        }, 100);
    };


    const detect = async (net) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const person = await net.segmentPersonParts(video);

            // The keypoints array index can be changed to get data from different bodyparts. See Keypoints.png file in repo. 
            draw(xFunc(person.allPoses[0].keypoints[10].position.x), yFunc(person.allPoses[0].keypoints[10].position.y));
        }
    };

    /* Will draw two rectangles, one at an hardcoded coordinate and one at coordinates recieved from bodypix.
     * The hardcoded is used to center the person. Should hit the person at about waist/belt level.
     */
    function draw(x, y) {
        var canvas = document.getElementById('detectionboard');

        var ctx = canvas.getContext('2d');

        ctx.fillRect(300.0, 300.0, 10, 10);

        console.log("X: " + x + " Y: " + y)

        ctx.fillStyle = "#FFFF00";
        ctx.fillRect(xFunc(x), yFunc(y), 10, 10);
    }

    /*
     * Uses m and b calulated with manually measured data and Least Squares Regression.
     */
    function xFunc(x) {
        return (0.7 * x + 133.7)
    }

    /*
     * Uses m and b calulated with manually measured data and Least Squares Regression.
     */
    function yFunc(y) {
        return (0.77 * y + 93)
    }

    runBodysegment()

    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 0,
                        height: 0,
                    }}
                />

                <canvas id="detectionboard"
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 800,
                        height: 600,
                    }}
                />
            </header>
        </div>
    );
}

export default Detection;
