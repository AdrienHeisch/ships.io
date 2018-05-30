import * as PIXI from 'pixi.js';
import Timer from './../shared/Timer';
import StateObject from './../shared/gameobjects/StateObject';
import DisplayObject from './DisplayObject';
import * as $ from 'jquery';

export default class DisplayManager {

    private static timer:Timer = new Timer();
    private static animationFrame:number;

    private static _app:PIXI.Application;
    public static get app () { return DisplayManager._app; }

    private static rendererDisplay:PIXI.Text;
    private static fpsDisplay:PIXI.Text;

    public static init () {
        (window as any).PIXI = undefined;
        PIXI.utils.skipHello();
        
        DisplayManager._app = new PIXI.Application({ width: 1280, height: 720, transparent: false });
        DisplayManager.app.renderer.backgroundColor = 0xCCCCCC;
        
        $(document.body).append(
            $("<div></div>").attr("id", "root").append(
                $(DisplayManager.app.view)
            )
        );

        let lRendererType:string =
            DisplayManager.app.renderer instanceof PIXI.CanvasRenderer
                ? "Canvas"
                : DisplayManager.app.renderer instanceof PIXI.WebGLRenderer
                    ? "WebGL"
                    : "Unknown"
        ;

        DisplayManager.rendererDisplay = new PIXI.Text("Current renderer : " + lRendererType);
        DisplayManager.app.stage.addChild(DisplayManager.rendererDisplay);

        DisplayManager.fpsDisplay = new PIXI.Text("");
        DisplayManager.fpsDisplay.y = DisplayManager.rendererDisplay.y + DisplayManager.rendererDisplay.height;
        DisplayManager.app.stage.addChild(DisplayManager.fpsDisplay);

        DisplayManager.timer.reset
        DisplayManager.resume();
    }

    private static render () {
        DisplayManager.timer.update();
        DisplayManager.fpsDisplay.text = Math.round(1000 / DisplayManager.timer.deltaTime) + " FPS";
        
        for (let lStateObject of StateObject.list) {
            if (!DisplayObject.list[lStateObject.uid]) {
                DisplayManager.app.stage.addChild(DisplayObject.addSprite(lStateObject.uid).sprite);
            }

            let lDisplayObject:DisplayObject = DisplayObject.list[lStateObject.uid];
            lDisplayObject.sprite.x = lStateObject.x;
            lDisplayObject.sprite.y = lStateObject.y;
            lDisplayObject.setDisplay(lStateObject.getDisplayName());
        }

        DisplayManager.animationFrame = requestAnimationFrame(DisplayManager.render.bind(DisplayManager));
    }

    public static resume () {
        DisplayManager.render();
    }

    public static stop () {
        cancelAnimationFrame(DisplayManager.animationFrame);
    }
}