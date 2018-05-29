import "../../assets/stylesheets/style.css";
import "../../assets/pixi/textures.png";

import textureAtlas from "../../assets/pixi/textures.json";
import * as PIXI from "pixi.js";
import GameManager from './../shared/GameManager';
import DisplayManager from './DisplayManager';

export default ({

    textures: undefined,

    init() {
        PIXI.loader.add(textureAtlas).load(() => {
            this.textures = PIXI.loader.resources[textureAtlas].textures;
            GameManager.init();
            DisplayManager.init();
        });
    }
})