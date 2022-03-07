import React, { useState, useEffect } from "react";

const ImageLoadComponent = () => {

    function handleFileSelected (e) {
        var width, height;

        var image = new Image(640,480);
        image.src = window.URL.createObjectURL(e.target.files[0])

        var canvas = document.getElementById('board');
        var ctx = canvas.getContext('2d');

        image.onload = function(){
            width = image.width;
            height= image.height;

            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;

            ctx.drawImage(this, 0, 0);

            var imgd = ctx.getImageData(0,0,canvas.width,canvas.height);
            var pix = imgd.data;

            var pixAverage = [];
            var coordinates = [];

            for (var i = 0; i < pix.length; i += 4) {
                var avg = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;
                pixAverage.push(avg);
            }

            var count = 0;

            for(var y = 0; y < height; y++)
            {
                for(var x = 0; x < width; x ++)
                {
                    if(pixAverage[count]>225)
                    {
                        if(coordinates.length == 0) {
                            coordinates.push([x,y])
                        }
                        if(coordinates.length == 1) {
                            var x1 = coordinates[0][0];
                            if((x1 + 30 < x))
                            {
                                coordinates.push([x,y])
                            }
                        }
                        if(coordinates.length == 2) {
                            var y1 = coordinates[0][1];
                            if((y1 + 40 < y))
                            {
                                coordinates.push([x,y])
                            }
                        }
                        if(coordinates.length == 3)
                        {
                            var x1 = coordinates[2][0];
                            if((x1 + 30 < x))
                            {
                                coordinates.push([x,y])
                                break;
                            }
                        }
                    }
                    count++;
                }
            }
            console.log(coordinates);
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