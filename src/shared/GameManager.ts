import Timer from './Timer';
import Ship from './gameobjects/sprites/Ship';
import Bullet from './gameobjects/sprites/Bullet';
import GameObject from './gameobjects/GameObject';

export default class GameManager {

    public static stepMethods:Array<Function> = [GameManager.doActionAll];

    public static timer:Timer = new Timer();

    private static _timeStep:number = 16;

    public static get timeStep () { return GameManager._timeStep; }
    public static set timeStep (pStep) {
        GameManager._timeStep = pStep;
        GameManager.pause();
        GameManager.resume();
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
        
        GameManager.resume();
    }

    private static step ():void {
        for (let lMethod of GameManager.stepMethods) lMethod();
    }

    private static doActionAll ():void {
        for (let lIndex in GameObject.list) GameObject.list[lIndex].doAction();
    }

    public static resume ():void {
        GameManager._interval = setInterval(GameManager.step, GameManager.timeStep);
    }

    public static pause ():void {
        clearInterval(GameManager._interval);
    }
    
}