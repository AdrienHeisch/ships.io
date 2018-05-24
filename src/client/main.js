import Point from "../shared/point.js";
import shipImage from "../assets/images/ship.png";

export default function init() {
    console.log('init!');
    console.log($(window));

    /*let img = new Image();
    img.src = shipImage;
    img.onload = () => $("#root").append(img);
    img.onerror = () => console.log("Couldn't load ship.png...") */

    /*(async function() {
        $("#root").append(await (() => {
            let img = new Image();
            img.src = shipImage;
            return img;
        }));
    })();*/

    new Promise((resolve, reject) => {
        let img = new Image();
        img.src = shipImage;
        img.onload = () => resolve(img);
        img.onerror = () => reject(shipImage);
    }).then(
        img => $("#root").append(img),
        src => console.log("Could not load image", src)
    );

    console.log(new Point(5, 2));
}