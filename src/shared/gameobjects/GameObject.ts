export default class GameObject {

    public static readonly list:Array<GameObject> = [];

    public doAction:Function;

    public x:number = 0;
    public y:number = 0;

    constructor () {
        GameObject.list.push(this);
        this.setModeVoid();
    }

    protected doActionNormal ():void {}

    public setModeNormal ():void {
        this.doAction = this.doActionNormal;
    }

    protected doActionVoid ():void {}

    public setModeVoid ():void {
        this.doAction = this.doActionVoid;
    }

    public destroy ():void {
        GameObject.list.splice(GameObject.list.indexOf(this), 1);
    }

}