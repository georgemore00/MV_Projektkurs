import React, { useState, useEffect } from "react";

const ImageLoadComponent = () => {

    function handleFileSelected (e) {
        var width, height;

        var image = new Image();
        image.src = window.URL.createObjectURL(e.target.files[0])

        var canvas = document.getElementById('board');
        var ctx = canvas.getContext('2d');

        image.onload = function(){
            var coordinates = [];

            width = image.width;
            height= image.height;

            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;

            ctx.drawImage(this, 0, 0);

            var imgd = ctx.getImageData(0,0,canvas.width,canvas.height);
            var pix = imgd.data;

            var pixAverage = [];

            for (var i = 0; i < pix.length; i += 4) {
                var avg = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;
                pixAverage.push(avg);
            }

            console.log(width + " " + height);

            var count = 0;

            for(var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    if (pixAverage[count] > 225) {
                        coordinates.push([x, y])
                        /*if (coordinates.length == 0) {
                            coordinates.push([x, y])
                        }
                        if (coordinates.length == 1) {
                            var x1 = coordinates[0][0];
                            if ((x1 + 30 < x)) {
                                coordinates.push([x, y])
                            }
                        }
                        if (coordinates.length == 2) {
                            var y1 = coordinates[0][1];
                            if ((y1 + 30 < y)) {
                                coordinates.push([x, y])
                            }
                        }
                        if (coordinates.length == 3) {
                            var x1 = coordinates[2][0];
                            if ((x1 + 30 < x)) {
                                coordinates.push([x, y])
                                break;
                            }
                        }*/
                    }

                    count++;
                }
            }

            console.log(count);

            console.log(coordinates);

            var canvasCoordinates = [];
            canvasCoordinates.push([200,50]);
            canvasCoordinates.push([500,200]);
            canvasCoordinates.push([200,250]);
            canvasCoordinates.push([500,350]);

            var canvasX = [];
            canvasX.push(canvasCoordinates[0][0]);
            canvasX.push(canvasCoordinates[1][0]);
            canvasX.push(canvasCoordinates[2][0]);
            canvasX.push(canvasCoordinates[3][0]);

            var canvasY = [];
            canvasY.push(canvasCoordinates[0][1]);
            canvasY.push(canvasCoordinates[1][1]);
            canvasY.push(canvasCoordinates[2][1]);
            canvasY.push(canvasCoordinates[3][1]);

            var cordX = [];
            cordX.push(coordinates[0][0]);
            cordX.push(coordinates[1][0]);
            cordX.push(coordinates[2][0]);
            cordX.push(coordinates[3][0]);

            var cordY = [];
            cordY.push(coordinates[0][1]);
            cordY.push(coordinates[1][1]);
            cordY.push(coordinates[2][1]);
            cordY.push(coordinates[3][1]);

            var bx, by;
            var mx, my;

            var todoes = findLineByLeastSquares(canvasX, cordX);
            mx = todoes[0];
            bx = todoes[1];

            var todoes = findLineByLeastSquares(canvasY, cordY);
            my = todoes[0];
            by  = todoes[1];

            sessionStorage.setItem("mx", mx);
            sessionStorage.setItem("bx", bx);

            sessionStorage.setItem("my", my);
            sessionStorage.setItem("by", by);
            console.log("KLAR");
            console.log(sessionStorage.getItem("mx"));
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