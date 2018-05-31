import InputManager from './InputManager';
import GameObject from './../../shared/gameobjects/GameObject';

@staticImplements<InputManager>()
export default class KeyboardManager {

    private static keys:Array<boolean>;

    public static init ():void {
        KeyboardManager.keys = [];
        window.addEventListener('keydown', KeyboardManager.registerKey);
        window.addEventListener('keyup', KeyboardManager.unregisterKey);
    }

    public static stop ():void {
        KeyboardManager.keys = undefined;
        window.removeEventListener('keydown', KeyboardManager.registerKey);
        window.removeEventListener('keyup', KeyboardManager.unregisterKey);
    }

    public static get up    () { return KeyboardManager.checkKey(38); }
    public static get down  () { return KeyboardManager.checkKey(40); }
    public static get left  () { return KeyboardManager.checkKey(37); }
    public static get right () { return KeyboardManager.checkKey(39); }

    private static checkKey (pKeyCode:number):boolean {
        return !!KeyboardManager.keys[pKeyCode];
    }

    private static registerKey(pEvent:KeyboardEvent):void {
        if (!KeyboardManager.checkKey(pEvent.keyCode)) KeyboardManager.keys[pEvent.keyCode] = true;
    }

    private static unregisterKey(pEvent:KeyboardEvent):void {
        if (KeyboardManager.checkKey(pEvent.keyCode)) delete KeyboardManager.keys[pEvent.keyCode];
    }

}

function staticImplements<T>() {
    return (constructor: T) => {};
}