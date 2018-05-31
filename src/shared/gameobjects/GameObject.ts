export default class GameObject {

    public static readonly list:Array<GameObject> = [];

    private static getNewId ():number  {
        return GameObject.lastId++;
    }

    private static lastId:number = 0;

    public readonly uid:number = GameObject.getNewId();

    public doAction:Function;

    public x:number = 0;
    public y:number = 0;

    constructor () {
        GameObject.list[this.uid] = this;
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
        delete GameObject.list[this.uid];
    }

}