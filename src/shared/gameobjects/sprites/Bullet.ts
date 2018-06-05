import Mobile from './Mobile';
import StateObject from '../StateObject';

export default class Bullet extends Mobile {

    public static readonly SPEED:number = 10;

    protected blinkCounter:number = 0;

    constructor () {
        super();
    }

    protected doActionNormal ():void {
        super.doActionNormal();
        if ((this.blinkCounter++) % 20 === 0) this.state = (this.state === StateObject.DEFAULT_STATE ? "red" : StateObject.DEFAULT_STATE);
    }

}
