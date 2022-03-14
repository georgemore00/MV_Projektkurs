import React from "react";

/*
 * 
 */
const LoadImage = () => {

    /*
     * This function is called to handle the uploaded file.
     */
    function handleFileSelected(e) {
        var width, height;

        var image = new Image();
        image.src = window.URL.createObjectURL(e.target.files[0])

        var canvas = document.getElementById('imageboard');
        var ctx = canvas.getContext('2d');

        image.onload = function () {
            width = image.width;
            height = image.height;

            console.log("Dimensions of loaded image");
            console.log("Width: " + width + " Height: " + height)

            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;

            // Draws the loaded image to the canvas
            ctx.drawImage(this, 0, 0);

            var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var pix = imgd.data;

            var pixAverage = avgRGB(pix)

            var coordinates = getWhiteRect(pixAverage, width, height)

            // coordinates array should now have 4 seperate arrays with coordinates for each rectangle.
            console.log(coordinates);

            // Seperate canvas and camera values to 4 seperate arrays.
            var canvasCoordinates = [];
            canvasCoordinates.push([200, 50]);
            canvasCoordinates.push([500, 200]);
            canvasCoordinates.push([200, 250]);
            canvasCoordinates.push([500, 350]);

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

            var cameraX = [];
            cameraX.push(coordinates[0][0]);
            cameraX.push(coordinates[1][0]);
            cameraX.push(coordinates[2][0]);
            cameraX.push(coordinates[3][0]);

            var cameraY = [];
            cameraY.push(coordinates[0][1]);
            cameraY.push(coordinates[1][1]);
            cameraY.push(coordinates[2][1]);
            cameraY.push(coordinates[3][1]);

            console.log("Calculating values...");

            // Instead of the findLineLeastSquares function, the jonasMath function can be used.
            // It does however not give correct values.
            var xLine = findLineByLeastSquares(cameraX, canvasX);
            var yline = findLineByLeastSquares(cameraY, canvasY);

            var mx = xLine[0];
            var bx = xLine[1];

            var my = yline[0];
            var by = yline[1];


            // Stored in session storage to allow access from other components.
            sessionStorage.setItem("mx", mx);
            sessionStorage.setItem("bx", bx);

            sessionStorage.setItem("my", my);
            sessionStorage.setItem("by", by);

            console.log("DONE!");
            
            console.log("mx: " + sessionStorage.getItem("mx"));
            console.log("bx: " + sessionStorage.getItem("bx"));

            console.log("my: " + sessionStorage.getItem("my"));
            console.log("by: " + sessionStorage.getItem("by"));

        }
    };

    /*
     * Averages the red, green and blue values to a single value.
     * Skips the transparency value. 
     */
    function avgRGB(pix) {
        var pixAverage = []

        for (var i = 0; i < pix.length; i += 4) {
            var avg = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;
            pixAverage.push(avg);
        }

        return pixAverage
    }

    /*
     * Analyzes each pixel RGB value to find the ones that pass the threshold.
     * Threshold is 225 (we are looking for white rectangles on a black/dark background)
     */
    function getWhiteRect(pixAverage, width, height) {
        var count = 0;
        var coordinates = []
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (pixAverage[count] > 225) {
                    if (coordinates.length == 0) {
                        coordinates.push([x, y])
                    }
                    if (coordinates.length == 1) {
                        var x1 = coordinates[0][0];
                        if ((x1 + 30 < x)) {
                            coordinates.push([x, y])
                        }
                    }
                    if (coordinates.length == 2) {
                        var y1 = coordinates[1][1];
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
                    }
                }
                count++;
            }
        }
        return coordinates
    }

    /*
     * Used to calculate m and b from below equation. Uses Least Squares Regression.
     * y = mx + b
     */
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
            return [[], []];
        }

        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (let i = 0; i < values_length; i++) {
            x = values_x[i];
            y = values_y[i];
            x_sum += x;
            y_sum += y;
            xx_sum += x * x;
            xy_sum += x * y;
            count++;
        }

        /*
         * Calculate m and b for the line equation:
         * y = x * m + b
         */
        var m = (count * xy_sum - x_sum * y_sum) / (count * xx_sum - x_sum * x_sum);
        var b = (y_sum / count) - (m * x_sum) / count;

        return [m, b];
    };

    /*
     * Used to calculate m and b from below equation. Math from Jonas.
     * y = mx + b
     */
    function jonasMath(cameraValues, canvasValues) {
        let camera2Rect = cameraValues[1]
        let camera4Rect = cameraValues[3]
        let cameraDelta = camera4Rect - camera2Rect

        let canvas2Rect = canvasValues[1]
        let canvas4Rect = canvasValues[3]
        let canvasDelta = canvas4Rect - canvas2Rect

        let m = (canvas2Rect * canvasDelta) / cameraDelta
        let b = (cameraDelta - canvasDelta) / cameraDelta

        return [m, b];
    }

    return (
        <div>
            <input name="photo" type="file" accept="image/*"
                onChange={handleFileSelected} />
            <header className="App-header">
                <canvas id="imageboard"
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
                        background: 'white',
                    }}
                    canvas />
            </header>
        </div>
    );
}

export default LoadImage;