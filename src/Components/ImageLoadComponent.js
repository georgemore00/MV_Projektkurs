import React, { useState, useEffect } from "react";

const ImageLoadComponent = () => {

    function handleFileSelected (e) {
        var width, height;

        var image = new Image();
        image.src = window.URL.createObjectURL(e.target.files[0])

        var canvas = document.getElementById('board');
        var ctx = canvas.getContext('2d');

        image.onload = function(){
            width = image.width;
            height= image.height;

            console.log(width + " " + height);

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

    function findLineByLeastSquares(values_x, values_y) {
        var x_sum = 0;
        var y_sum = 0;
        var xy_sum = 0;
        var xx_sum = 0;
        var count = 0;

        /*
         * The above is just for quick access, makes the program faster
         */
        var x = 0;
        var y = 0;
        var values_length = values_x.length;

        if (values_length != values_y.length) {
            throw new Error('The parameters values_x and values_y need to have same size!');
        }

        /*
         * Above and below cover edge cases
         */
        if (values_length === 0) {
            return [ [], [] ];
        }

        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (let i = 0; i< values_length; i++) {
            x = values_x[i];
            y = values_y[i];
            x_sum+= x;
            y_sum+= y;
            xx_sum += x*x;
            xy_sum += x*y;
            count++;
        }

        /*
         * Calculate m and b for the line equation:
         * y = x * m + b
         */
        var m = (count*xy_sum - x_sum*y_sum) / (count*xx_sum - x_sum*x_sum);
        var b = (y_sum/count) - (m*x_sum)/count;

        /*
         * We then return the x and y data points according to our fit
         */
        /*var result_values_x = [];
        var result_values_y = [];

        for (let i = 0; i < values_length; i++) {
            x = values_x[i];
            y = x * m + b;
            result_values_x.push(x);
            result_values_y.push(y);
        }*/

        return [m, b];
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