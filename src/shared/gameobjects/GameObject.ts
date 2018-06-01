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

    public start ():void { this.setModeNormal(); }

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

    static getData ():Array<any> {
        let lData:Array<any> = [];
        for (let lGameObject of (GameObject.list as Array<any>)) {
            let lItem:any = {};
            for (let lProperty in lGameObject) {
                if (!(lGameObject[lProperty] instanceof Object)) {
                    lItem[lProperty] = lGameObject[lProperty];
                }
            }
            lData.push(lItem);
        }
        return lData;
    }

    static setData (pData:Array<any>):void {
        let lMap:Array<number> = GameObject.list.map(pGameObject => pGameObject.uid);

        for (let lItem of pData) {
            if (lMap.indexOf((lItem.uid as number)) >= 0) {
                Object.assign(GameObject.list[lMap.indexOf((lItem.uid as number))], lItem);
            }
        }
    }

}