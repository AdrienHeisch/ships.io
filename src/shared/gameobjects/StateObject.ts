import GameObject from './GameObject';

export default class StateObject extends GameObject {

    public static readonly list:Array<StateObject> = [];
    
    public static readonly DEFAULT_STATE:string = "default";

    public assetName:string;
    public state:string = StateObject.DEFAULT_STATE;

    public constructor () {
        super();
        StateObject.list.push(this);

        this.assetName = (this.constructor as any).name.toLowerCase();
    }

    public getDisplayName ():string {
        return this.assetName + "_" + this.state;
    }

    public destroy ():void {
        StateObject.list.splice(StateObject.list.indexOf(this), 1);
        super.destroy();
    }

}