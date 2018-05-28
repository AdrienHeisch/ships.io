import "../../assets/stylesheets/style.css";
import "../../assets/images/textures.png";

import textureAtlas from "../../assets/images/textures.json";
import $ from "jquery";
import * as PIXI from "pixi.js";

export default function init() {
    window.PIXI = undefined;
    
    let app = new PIXI.Application({ width: 1280, height: 720});
    app.renderer.backgroundColor = 0xFFFFFF;

    $(document.body).append(
        $("<div></div>").attr("id", "root").append(
            $(app.view)
        )
    );

    PIXI.loader.add(textureAtlas).load(() => {
        let textures = PIXI.loader.resources[textureAtlas].textures["ship.png"];
        let sprite = new PIXI.Sprite(textures);
        app.stage.addChild(sprite);

        let draw = () => {
            
        }
    });
}

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

/*new Promise((resolve, reject) => {
    let img = new Image();
    img.src = shipImage;
    img.onload = () => resolve(img);
    img.onerror = () => reject(shipImage);
}).then(
    img => $("#root").append(img),
    src => console.log("Could not load image", src)
);*/