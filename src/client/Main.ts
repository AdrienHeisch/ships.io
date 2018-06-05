import '../../assets/stylesheets/style.css';
import '../../assets/pixi/textures.png';
import textureAtlas from '../../assets/pixi/textures.json';

import * as PIXI from 'pixi.js';

import GameManager from '../shared/GameManager';
import DisplayManager from './DisplayManager';
import NetworkManager from './NetworkManager';
import KeyboardManager from './input/KeyboardManager';
import GameObject from './../shared/gameobjects/GameObject';
import Ship from '../shared/gameobjects/sprites/Ship';

export default class Main {

    public static init ():void {
        PIXI.loader.add(textureAtlas).load(() => {
            KeyboardManager.init();

            GameManager.stepMethods.unshift(() => {
                (GameObject.list[0] as Ship).setInput({
                    up:KeyboardManager.up,
                    down:KeyboardManager.down,
                    left:KeyboardManager.left,
                    right:KeyboardManager.right,
                    fire:KeyboardManager.space
                });
                NetworkManager.sendInputs(KeyboardManager);
            });

            GameManager.init();

            DisplayManager.init();

            NetworkManager.init();
        });
    }

}

Main.init();
