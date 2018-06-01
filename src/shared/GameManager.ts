import Timer from './Timer';
import Ship from './gameobjects/sprites/Ship';
import Bullet from './gameobjects/sprites/Bullet';
import GameObject from './gameobjects/GameObject';

export default class GameManager {

    public static stepMethods:Array<Function> = [GameManager.doActionAll];

    public static timer:Timer = new Timer();

    private static _timeStep:number = 16;

    public static get timeStep () { return this._timeStep; }
    public static set timeStep (pStep) {
        this._timeStep = pStep;
        this.pause();
        this.resume();
    }

    private static _interval:any;

    public static init ():void {
        // for (let i = 0; i < 1; i++) {
            let ship:Ship = new Ship();
            ship.x = 50;
            ship.y = 200;// + i;
            ship.start();
        // }
        

        let bullet:Bullet = new Bullet();
        bullet.x = 100;
        bullet.y = 200;
        bullet.start();
        
        this.resume();
    }

    private static step ():void {
        for (let lMethod of this.stepMethods) lMethod();
    }

    private static doActionAll ():void {
        for (let lIndex in GameObject.list) GameObject.list[lIndex].doAction();
    }

    public static resume ():void {
        this._interval = setInterval(this.step.bind(this), this.timeStep);
    }

    public static pause ():void {
        clearInterval(this._interval);
    }
    
}