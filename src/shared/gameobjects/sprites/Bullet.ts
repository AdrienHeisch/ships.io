import StateObject from '../StateObject';

export default class Bullet extends StateObject {

    protected blinkCounter:number = 0;

    constructor () {
        super();
    }

    doActionNormal ():void {
        super.doActionNormal();
        this.x++;
        if ((this.blinkCounter++) % 20 === 0) this.setState(this.state === StateObject.DEFAULT_STATE ? "red" : StateObject.DEFAULT_STATE);
    }

}