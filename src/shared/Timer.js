export default class Timer {

    static get now () {
        return window ? window.performance.now() : Date.now();
    } 

    constructor() {
        this.isRunning = false;
        this.reset();
        this.resume();
    }

    update() {
        this.updateDeltaTime();
        this.elapsedTime += this.deltaTime;
    }

    updateDeltaTime() {
        let lCurrent = Timer.now;
        this.deltaTime = this.isRunning ? lCurrent - this.lastDateInMS : 0;
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
        this.elapsedTime = 0;
        this.deltaTime = 0;
    }

}