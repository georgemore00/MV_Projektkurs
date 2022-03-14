import React from "react";
import picture from '../resources/Example.jpg';

const Info = () => {

    return (
        <div>
            <h1>Shared Augmentation</h1>
            <p>To use the program, you need a camera and a projector.</p>
            <p>Start by pointing the camera and the projector towards a wall or a projector screen.
                Make sure that the camera can see the whole window and the person that will stand in front of the wall.
            </p>
            <h3>To use the hardcoded values, head to the Detection tab. Else, follow below.</h3>
            <p>
                Head to the draw tab and project the screen to the wall. Take a picture with the camera app in the computer.
                You need to fullscreen the window and scroll down a bit to hide the draw button. See below for example.
            </p>
            <img src={picture} alt="Example image" width="400" height="305" />
            <p>Head to the Load image tab and load the image you just took. Check console for info.
                Head to the Image Detection tab and the program should project the rectangles.
            </p>
            <p> &copy; 2022 KTH PROJECT GROUP SHARED AUGMENTATION </p>
        </div>
    );
}

export default Info;