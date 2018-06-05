import * as PIXI from 'pixi.js';
import Timer from '../shared/Timer';
import StateObject from '../shared/gameobjects/StateObject';
import DisplayObject from './DisplayObject';
import * as $ from 'jquery';

export default class DisplayManager {

    private static timer:Timer = new Timer();
    private static animationFrame:number;

    private static _app:PIXI.Application;
    public static get app () { return this._app; }

    private static rendererDisplay:PIXI.Text;
    private static fpsDisplay:PIXI.Text;
    private static pingDisplay:PIXI.Text;

    public static init () {
        (window as any).PIXI = undefined;
        PIXI.utils.skipHello();

        this._app = new PIXI.Application({ width: 1280, height: 720, transparent: false });
        this.app.renderer.backgroundColor = 0xCCCCCC;

        $(document.body).append(
            $("<div></div>").attr("id", "root").append(
                $(this.app.view)
            )
        );

        let lRendererType:string =
            this.app.renderer instanceof PIXI.CanvasRenderer
                ? "Canvas"
                : this.app.renderer instanceof PIXI.WebGLRenderer
                    ? "WebGL"
                    : "Unknown"
        ;

        this.rendererDisplay = new PIXI.Text("Current renderer : " + lRendererType);
        this.app.stage.addChild(this.rendererDisplay);

        this.fpsDisplay = new PIXI.Text("");
        this.fpsDisplay.y = this.rendererDisplay.y + this.rendererDisplay.height;
        this.app.stage.addChild(this.fpsDisplay);

        this.pingDisplay = new PIXI.Text("");
        this.pingDisplay.y = this.pingDisplay.y + this.pingDisplay.height;
        this.app.stage.addChild(this.pingDisplay);

        this.timer.reset();
        this.resume();
    }

    private static render () {
        this.timer.update();
        this.fpsDisplay.text = Math.round(1000 / this.timer.deltaTime) + " FPS";

        for (let lStateObject of StateObject.list) {
            if (!DisplayObject.list[lStateObject.uid]) {
                this.app.stage.addChild(DisplayObject.addSprite(lStateObject.uid).sprite);
            }

            let lDisplayObject:DisplayObject = DisplayObject.list[lStateObject.uid];
            lDisplayObject.sprite.x = lStateObject.x;
            lDisplayObject.sprite.y = lStateObject.y;
            lDisplayObject.sprite.rotation = lStateObject.rotation;
            lDisplayObject.setDisplay(lStateObject.getDisplayName() + ".png");
        }

        this.animationFrame = requestAnimationFrame(this.render.bind(this));
    }

    public static resume () {
        this.render();
    }

    public static stop () {
        cancelAnimationFrame(this.animationFrame);
    }
}
