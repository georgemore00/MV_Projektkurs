import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import "C:/Users/qriti/OneDrive/Dokument/mvproject/src/App.css"


const Detection = () => {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);



    //Load bodyPix
    const runBodysegment = async () => {
        const net = await bodyPix.load();
        console.log("BodyPix model loaded. + hej");
        //Loop and detect hands
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

            draw(xFunc(person.allPoses[0].keypoints[10].position.x), yFunc(person.allPoses[0].keypoints[10].position.y));
        }
    };


    function draw(x, y) {
        var canvas = document.getElementById('board');

        var ctx = canvas.getContext('2d');

        ctx.fillRect(300.0, 300.0, 10, 10);

        //ctx.fillStyle = "#FFFF00";
        //ctx.fillRect(xFunc(x), yFunc(y), 10, 10);
        ctx.fillRect(x, y, 10, 10);
    }

    //Funkar bara om vi har kalibrerat först
    function yFunc(x) {
        var my = parseFloat(sessionStorage.getItem("my"));
        var by = parseFloat(sessionStorage.getItem("by"));
        var y = (x * my + by);
        console.log(y);
        return y
    }

    //Funkar bara om vi har kalibrerat först
    function xFunc(x) {
        var mx = parseFloat(sessionStorage.getItem("mx"));
        var bx = parseFloat(sessionStorage.getItem("bx"));
        var y = (x * mx + bx);
        return y
    }

    /*function xFunc(x) {
        return (0.7 * x + 133.7)
    }*/

    /*function yFunc(x) {
        return (0.77 * x + 93)
    }*/


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
                        width: 800,
                        height: 600,
                    }}
                />

                <canvas id="board"
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
                            //background: 'white',
                        }}
                />

            </header>
        </div>
    );
}

export default Detection;