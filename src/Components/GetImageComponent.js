import React, { useRef } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";

const GetImage = () => {

    function draw() {
        var canvas = document.getElementById('board2');
        var ctx = canvas.getContext('2d');

        console.log(canvas.offsetWidth + " " + canvas.offsetHeight);
        console.log(ctx.innerHeight + " " + ctx.innerWidth);

        ctx.fillStyle = "#FFFF00";

        ctx.fillRect(100.0, 100.0, 10, 10);



        //Top two rectsss
        ctx.fillRect("10", "10", 10, 10);
        ctx.fillRect("400.0", "200.0", 10, 10);

        //Bottom two rects
        ctx.fillRect("200.0", "400.0", 10, 10);
        ctx.fillRect("400.0", "400.0", 10, 10);
    };

    return (
        <div>
            <button onClick={draw}>
                Draw
            </button>
            <header className="App-header">
                <canvas id="board2"
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
                            background: 'black',
                        }}
                        canvas/>
            </header>
        </div>
    );
}

export default GetImage;