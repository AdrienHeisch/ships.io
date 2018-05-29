import "../../assets/stylesheets/style.css";
import "../../assets/pixi/textures.png";

import textureAtlas from "../../assets/pixi/textures.json";
import $ from "jquery";
import * as PIXI from "pixi.js";
import Point from './../shared/point';

export default function init() {
    window.PIXI = undefined;
    PIXI.utils.skipHello();

    let app = new PIXI.Application({ width: 1280, height: 720, transparent: true });
    app.renderer.backgroundColor = 0xFFFFFF;

    $(document.body).append(
        $("<div></div>").attr("id", "root").append(
            $(app.view)
        )
    );

    let rendererType =
        app.renderer instanceof PIXI.CanvasRenderer
            ? "Canvas"
            : app.renderer instanceof PIXI.WebGLRenderer
                ? "WebGL"
                : "Unknown"
    ;

    let renderer = new PIXI.Text("Current renderer : " + rendererType);
    app.stage.addChild(renderer);

    PIXI.loader.add(textureAtlas).load(() => {
        let textures = PIXI.loader.resources[textureAtlas].textures;
        
        let ship = new PIXI.Sprite(textures["ship.png"]);
        ship.x = 100;
        ship.y = 100;
        ship.anchor.set(0.5, 0.5);
        app.stage.addChild(ship);

        let bullet = new PIXI.Sprite(textures["red_bullet.png"]);
        bullet.anchor.set(0.5, 0.5);
        bullet.x = ship.x + ship.width / 2 + bullet.width / 2;
        bullet.y = ship.y;
        app.stage.addChild(bullet);

        let fps = new PIXI.Text("");
        fps.y = renderer.y + renderer.height;
        app.stage.addChild(fps)

        let lastTime = window.performance.now();
        let draw = () => {
            bullet.x += 200 * (window.performance.now() - lastTime) / 1000;
            fps.text = Math.round(1000 / (window.performance.now() - lastTime)) + " FPS"
            lastTime = window.performance.now();
            requestAnimationFrame(draw);
        }
        draw();
    });

    console.log("Here's a point:", new Point(5, 2));
    console.log("hope")
}