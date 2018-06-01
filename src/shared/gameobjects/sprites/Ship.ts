import StateObject from './../StateObject';

export default class Ship extends StateObject {

    private input:ShipInput = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    constructor () {
        super();
    }

    public setInput (pInput:ShipInput):void {
        Object.assign(this.input, pInput);
    }

    protected doActionNormal ():void {
        this.x += (Number(this.input.right) - Number(this.input.left)) * 1;
        this.y += (Number(this.input.down) - Number(this.input.up)) * 1;
    }

}