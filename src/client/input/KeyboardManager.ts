import InputManager from './InputManager';

@staticImplements<InputManager>()
export default class KeyboardManager {

    private static keys:Array<boolean>;

    public static init ():void {
        this.keys = [];
        window.addEventListener('keydown', this.registerKey.bind(this));
        window.addEventListener('keyup', this.unregisterKey.bind(this));
    }

    public static stop ():void {
        this.keys = undefined;
        window.removeEventListener('keydown', this.registerKey.bind(this));
        window.removeEventListener('keyup', this.unregisterKey.bind(this));
    }

    public static get up    () { return this.checkKey(38); }
    public static get down  () { return this.checkKey(40); }
    public static get left  () { return this.checkKey(37); }
    public static get right () { return this.checkKey(39); }

    private static checkKey (pKeyCode:number):boolean {
        return !!this.keys[pKeyCode];
    }

    private static registerKey(pEvent:KeyboardEvent):void {
        if (!this.checkKey(pEvent.keyCode)) this.keys[pEvent.keyCode] = true;
    }

    private static unregisterKey(pEvent:KeyboardEvent):void {
        if (this.checkKey(pEvent.keyCode)) delete this.keys[pEvent.keyCode];
    }

}

function staticImplements<T>() {
    return (constructor: T) => {};
}