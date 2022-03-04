import React, { useState, useEffect } from "react";

const ImageLoadComponent = () => {

    function handleFileSelected (e) {
        var image = new Image(640,480);
        image.src = window.URL.createObjectURL(e.target.files[0])

        var canvas = document.getElementById('board');
        var ctx = canvas.getContext('2d');

        image.onload = function(){

            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;

            ctx.drawImage(this, 0, 0);

            var imgd = ctx.getImageData(0,0,canvas.width,canvas.height);
            var pix = imgd.data;

            for (var i = 0; i < pix.length; i += 4) {
                var avg = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;
                pix[i]     = avg; // red
                pix[i + 1] = avg; // green
                pix[i + 2] = avg; // blue
            }

            console.log("ny bild");
            var count = 0;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                if(pix[i]>=225)
                {
                    count++;
                }
            }
            console.log(count)
        }
    };


    return (
        <div>
            <input name="photo" type="file" accept="image/*"
                   onChange={handleFileSelected}/>
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
                            width: 640,
                            height: 480,
                            background: 'white',
                        }}
                canvas/>
            </header>
        </div>
    );
}
export default ImageLoadComponent;