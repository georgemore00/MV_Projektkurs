import React, { useRef } from "react";
import Webcam from "react-webcam";

const ImageLoadComponent = () => {


    return (
        <div>
            <input type="file" id="input"></input>
            <header className="App-header">
                <canvas id="board"
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: "100%",
                            height: "100%",
                            background: 'white',
                        }}
                />
            </header>
        </div>
    );
}
export default ImageLoadComponent;