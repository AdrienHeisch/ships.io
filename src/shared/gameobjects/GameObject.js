export default class GameObject {

    constructor () {
        GameObject.list.push(this);
        this.setModeVoid();

        this.doAction;
    
        this.x = 0;
        this.y = 0;
    }

    doActionNormal () {}

    setModeNormal () {
        this.doAction = this.doActionNormal;
    }

    doActionVoid () {}

    setModeVoid () {
        this.doAction = this.doActionVoid;
    }

    destroy () {
        GameObject.list.splice(GameObject.list.indexOf(this), 1);
    }

}

GameObject.list = [];