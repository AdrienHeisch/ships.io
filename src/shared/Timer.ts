export default class Timer {

    static get now ():number {
        return window ? window.performance.now() : Date.now();
    } 

    protected isRunning:boolean = false;
    
    protected _elapsedTime:number;
    public get elapsedTime () { return this._elapsedTime; }

    protected _deltaTime:number;
    public get deltaTime () { return this._deltaTime; }

    protected lastDateInMS:number;

    constructor() {
        this.reset();
        this.resume();
    }

    update() {
        this.updateDeltaTime();
        this._elapsedTime += this.deltaTime;
    }

    updateDeltaTime() {
        let lCurrent = Timer.now;
        this._deltaTime = this.isRunning ? lCurrent - this.lastDateInMS : 0;
        this.lastDateInMS = lCurrent;
    }

    resume() {
        this.lastDateInMS = Timer.now;
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
    }

    reset() {
        this._elapsedTime = 0;
        this._deltaTime = 0;
    }

}