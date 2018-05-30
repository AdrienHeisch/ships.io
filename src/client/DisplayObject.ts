import "../../assets/pixi/textures.png";

import * as PIXI from "pixi.js";
import textureAtlas from '../../assets/pixi/textures.json';
import Main from './Main';

export default class DisplayObject {

    public static readonly list:Array<DisplayObject> = [];

    public static addSprite (pUid:number):DisplayObject {
        DisplayObject.list[pUid] = new DisplayObject();
        return DisplayObject.list[pUid];
    }

    public static removeSprite (pUid:number):void {
        DisplayObject.list[pUid].destroy();
        DisplayObject.list[pUid] = undefined;
    }

    public readonly sprite:PIXI.Sprite = new PIXI.Sprite();
    private assetName:string = "";

    private constructor (pAnchor:PIXI.Point = new PIXI.Point(0.5, 0.5)) {
        this.sprite.anchor.set(0.5, 0.5);
    }

    public setDisplay (pAssetName:string):void {
        if (this.assetName === pAssetName) return;
        this.assetName = pAssetName;
        this.sprite.texture = Main.textures[this.assetName];
    }

    protected destroy ():void {
        if (this.sprite.parent) this.sprite.parent.removeChild(this.sprite);
    }

}