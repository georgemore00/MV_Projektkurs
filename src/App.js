import React, { useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //Load bodyPix
  const runBodysegment = async () => {
    const net = await bodyPix.load();
    console.log("BodyPix model loaded.");
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

      // Make Detections
      // * One of (see documentation below):
      // *   - net.segmentPerson
      // *   - net.segmentPersonParts
      // *   - net.segmentMultiPerson
      // *   - net.segmentMultiPersonParts
      const person = await net.segmentPersonParts(video);
      console.log(person);

      console.log(person.allPoses[0].keypoints[10].position);

      draw(person.allPoses[0].keypoints[10].position.x, person.allPoses[0].keypoints[10].position.y);

    }
  };

  function draw(x,y) {
      var canvas = document.getElementById('board');

          var ctx = canvas.getContext('2d');

          ctx.fillRect(x,y, 20, 20);
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
                  width: 640,
                  height: 480,
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
            width: 640,
            height: 480,
          }}
        />

      </header>
    </div>
  );
}

export default App;
