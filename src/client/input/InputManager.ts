import config from '../../config/client.json';
import KeyboardManager from './KeyboardManager';

export default interface InputManager {
    
    init ():void;
    stop ():void;

    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;

}