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

export default ({

    textures: undefined,

    init() {
        NetworkManager.init();

        PIXI.loader.add(textureAtlas).load(() => {
            this.textures = PIXI.loader.resources[textureAtlas].textures;

            GameManager.init();

            KeyboardManager.init();
            
            GameManager.stepMethods.unshift(() => {
                GameObject.list[0].setInput({
                    up:KeyboardManager.up,
                    down:KeyboardManager.down,
                    left:KeyboardManager.left,
                    right:KeyboardManager.right
                });
                NetworkManager.sendInputs(KeyboardManager);
            });

            DisplayManager.init();
        });
    }
})