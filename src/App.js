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
    console.log("BodyPix model loaded. + hej");
    //Loop and detect hands
    setInterval(() => {
      detect(net);
      //drawPoint();
      // x = 300 y = 150 höger nedre hörn
      // om ökar x går man till höger, om man ökar y går man ner
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
      //console.log(person);

      //console.log("Right hand: " + person.allPoses[0].keypoints[11].position.y);
      //console.log("Left hand: " +  person.allPoses[0].keypoints[10].position.y);

      let bodypart = 0

      //console.log("X: " + person.allPoses[0].keypoints[bodypart].position.x);

      //console.log("Y: " + person.allPoses[0].keypoints[bodypart].position.y);

      //drawAll()




      draw(person.allPoses[0].keypoints[11].position.x, person.allPoses[0].keypoints[11].position.y, person.allPoses[0].keypoints[12].position.x, person.allPoses[0].keypoints[12].position.y, person.allPoses[0].keypoints[13].position.x, person.allPoses[0].keypoints[13].position.y, person.allPoses[0].keypoints[14].position.x, person.allPoses[0].keypoints[14].position.y);
      //drawPoint(person.allPoses[0].keypoints[0].position.x, person.allPoses[0].keypoints[0].position.y);
      //draw(person.allPoses[16].keypoints[0].position.x, person.allPoses[16].keypoints[0].position.y);

    }
  };

  function drawGrid() {
    var canvas = document.getElementById('board');
    var ctx = canvas.getContext('2d');

    // "Ctx" is your canvas context
    // "Width," "Height," and other vars that start with a capital letter are set according
    //   to your canvas size or preference

    var Height = 800;
    var Width = 600;
    var GridSize = 10;

    ctx.fillRect(800, 600, 20, 20);
    var i;
    for (i = 0; i < Height; i += GridSize) {
      ctx.lineWidth = 1;
      ctx.moveTo(0, i);
      ctx.lineTo(Width, i);
      ctx.stroke();
    }
    for (i = 0; i < Width; i += GridSize) {
      ctx.lineWidth = 1;
      ctx.moveTo(i, 0);
      ctx.lineTo(i, Height);
      ctx.stroke();
    }
  }

  function draw(x, y, x2, y2, x3, y3, x4, y4) {
    var canvas = document.getElementById('board');

    let s = 55;

    var ctx = canvas.getContext('2d');
    if(y+40>=y3) {
      ctx.fillStyle = "#00FF00"
    } else {
      ctx.fillStyle = "#FFFF00";
    }

    ctx.fillRect(300.0, 300.0, 10, 10);

    console.log("Knee Y: " + y);
    console.log("Hip Y: " + y3);



    //ctx.fillStyle = "#FFFF00";
    ctx.fillRect(xFunc(x), yFunc(y), 10, 10);
    //ctx.fillRect(xFunc(x2), yFunc(y2), 10, 10);
    ctx.fillRect(xFunc(x3), yFunc(y3), 10, 10);
    //ctx.fillRect(xFunc(x4), yFunc(y4), 10, 10);

  }

  function drawPoint(x, y) {
    var canvas = document.getElementById('board');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(300.0, 300.0, 10, 10);
  }

  function xFunc(x) {
    return (0.7 * x + 133.7)
  }

  function yFunc(x) {
    return (0.77 * x + 93)
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

//HELLOS

export default App;
