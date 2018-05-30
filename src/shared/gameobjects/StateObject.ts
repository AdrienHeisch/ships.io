import GameObject from './GameObject';

export default class StateObject extends GameObject {

    private static getNewId ():number  {
        return StateObject.lastId++;
    }

    private static lastId:number = 0;
    
    public static readonly list:Array<StateObject> = [];
    
    public static readonly DEFAULT_STATE:string = "default";
    public static readonly DEFAULT_EXTENSION:string = "png";

    public assetName:string;
    public state:string = StateObject.DEFAULT_STATE;
    public fileExtension:string = StateObject.DEFAULT_EXTENSION;

    public readonly uid:number = StateObject.getNewId();

    public constructor () {
        super();
        StateObject.list.push(this);

        this.assetName = (this.constructor as any).name.toLowerCase();
    }

    public getDisplayName ():string {
        return this.assetName + "_" + this.state + "." + this.fileExtension;
    }

    public destroy ():void {
        StateObject.list.splice(StateObject.list.indexOf(this), 1);
        super.destroy();
    }

}