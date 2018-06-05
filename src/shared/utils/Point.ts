export default class Point{

    public x:number;
    public y:number;

    constructor (pX:number = 0, pY:number = 0){
        this.x = pX;
        this.y = pY;
    }

    public setTo (pX:number = 0, pY:number = 0):void {
        this.x = pX;
        this.y = pY;
    }

    public get length () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}
