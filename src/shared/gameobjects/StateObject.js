import GameObject from './GameObject';

export default class StateObject extends GameObject {

    static getNewId () {
        return lastId++;
    }

    constructor () {
        super();
        StateObject.list.push(this);

        this.assetName = this.constructor.name.toLowerCase();
        this.state = StateObject.DEFAULT_STATE;
        this.fileExtension = StateObject.DEFAULT_EXTENSION;

        this.uid = StateObject.getNewId();
    }

    get displayName () {
        return this.assetName + "_" + this.state + "." + this.fileExtension;
    }

    setState (pState) {
        this.state = pState;
    }

    destroy () {
        DisplayObject.list.splice(DisplayObject.list.indexOf(this), 1);
        super.destroy();
    }

}

let lastId = 0;

StateObject.list = [];

StateObject.DEFAULT_STATE = "default";
StateObject.DEFAULT_EXTENSION = "png";