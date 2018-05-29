import * as PIXI from 'pixi.js';
import Timer from './../shared/Timer';
import StateObject from './../shared/gameobjects/StateObject';
import DisplayObject from './DisplayObject';
import $ from "jquery";

export default ({

    timer: new Timer(),

    app: undefined,

    fpsCount: undefined,

    init () {
        window.PIXI = undefined;
        PIXI.utils.skipHello();
        
        this.app = new PIXI.Application({ width: 1280, height: 720, transparent: false });
        this.app.renderer.backgroundColor = 0xCCCCCC;
        
        $(document.body).append(
            $("<div></div>").attr("id", "root").append(
                $(this.app.view)
            )
        );

        let rendererType =
            this.app.renderer instanceof PIXI.CanvasRenderer
                ? "Canvas"
                : this.app.renderer instanceof PIXI.WebGLRenderer
                    ? "WebGL"
                    : "Unknown"
        ;

        let renderer = new PIXI.Text("Current renderer : " + rendererType);
        this.app.stage.addChild(renderer);

        this.fpsCount = new PIXI.Text("");
        this.fpsCount.y = renderer.y + renderer.height;
        this.app.stage.addChild(this.fpsCount);

        this.resume();
    },

    render () {
        this.timer.update();
        this.fpsCount.text = Math.round(1000 / this.timer.deltaTime) + " FPS";

        for (let lStateObject of StateObject.list) {
            if (!DisplayObject.list[lStateObject.uid]) {
                this.app.stage.addChild(DisplayObject.addSprite(lStateObject.uid).renderer);
            }

            let lDisplayObject = DisplayObject.list[lStateObject.uid];
            lDisplayObject.renderer.x = lStateObject.x;
            lDisplayObject.renderer.y = lStateObject.y;
            lDisplayObject.setDisplay(lStateObject.displayName);
        }

        requestAnimationFrame(this.render.bind(this));
    },

    resume () {
        this.render();
    },

    stop () {
        cancelAnimationFrame(this.render);
    }
})