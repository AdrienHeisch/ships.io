import "../../assets/pixi/textures.png";

import * as PIXI from "pixi.js";
import textureAtlas from '../../assets/pixi/textures.json';
import Main from './Main';

export default class DisplayObject {

    static addSprite (pUid) {
        DisplayObject.list[pUid] = new DisplayObject();
        return DisplayObject.list[pUid];
    }

    static removeSprite (pUid) {
        DisplayObject.list[pUid].destroy();
        DisplayObject.list[pUdi] = undefined;
        delete DisplayObject.list[pUid];
    }

    constructor () {
        this.renderer = new PIXI.Sprite();
        this.renderer.anchor.set(0.5, 0.5);

        this.currentAsset = ""; 
    }

    setDisplay (pAssetName) {
        if (this.currentAsset === pAssetName) return;
        this.currentAsset = pAssetName;
        this.renderer.texture = Main.textures[this.currentAsset];
    }

    destroy () {}

}

DisplayObject.list = {};