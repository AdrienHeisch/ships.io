import '../../assets/stylesheets/style.css';
import '../../assets/pixi/textures.png';
import textureAtlas from '../../assets/pixi/textures.json';
import * as PIXI from 'pixi.js';
import GameManager from '../shared/GameManager';
import DisplayManager from './DisplayManager';
import NetworkManager from './NetworkManager';
import KeyboardManager from './input/KeyboardManager';
import GameObject from './../shared/gameobjects/GameObject';

export default ({

    textures: undefined,

    init() {
        NetworkManager.init();

        PIXI.loader.add(textureAtlas).load(() => {
            this.textures = PIXI.loader.resources[textureAtlas].textures;

            GameManager.init();

            KeyboardManager.init();

            GameManager.stepMethods.unshift(() => {
                let ship = GameObject.list[0];
                ship.x += (Number(KeyboardManager.right) - Number(KeyboardManager.left)) * 1;
                ship.y += (Number(KeyboardManager.down) - Number(KeyboardManager.up)) * 1;
            });

            DisplayManager.init();
        });
    }
})