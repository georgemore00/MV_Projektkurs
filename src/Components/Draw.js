import React from "react";

const Draw = () => {

    function draw() {
        var canvas = document.getElementById('drawboard');
        var ctx = canvas.getContext('2d');

        ctx.canvas.width = canvas.offsetWidth;
        ctx.canvas.height = canvas.offsetHeight;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // White dots
        ctx.fillStyle = "#FFFFFF";

        // Top two rects
        ctx.fillRect(200.0, 50, 10, 10);
        ctx.fillRect(500.0, 200.0, 10, 10);

        // Bottom two rects
        ctx.fillRect(200.0, 250.0, 10, 10);
        ctx.fillRect(500.0, 350.0, 10, 10);
    };

    return (
        <div>
            <button onClick={draw}>
                Draw
            </button>
            <header className="App-header">
                <canvas id="drawboard"
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
                    canvas />
            </header>
        </div>
    );
}

export default Draw;