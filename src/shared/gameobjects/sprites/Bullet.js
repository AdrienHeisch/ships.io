import StateObject from '../StateObject';

export default class Bullet extends StateObject {

    constructor () {
        super();
    }

    doActionNormal () {
        super.doActionNormal();
        this.x++;
        if ((i++) % 20 === 0) this.setState(this.state === StateObject.DEFAULT_STATE ? "red" : StateObject.DEFAULT_STATE);
    }

}

let i = 0;