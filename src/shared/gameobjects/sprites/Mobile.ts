import StateObject from '../StateObject';
import Point from '../../utils/Point';

export default class Mobile extends StateObject {

    public speed:number = 0;
    public acceleration:Point = new Point();
    public velocity:Point = new Point();

    public angularSpeed:number = 0;
    public angularAcceleration:number = 0;

    constructor () {
        super();
    }

    protected doActionNormal ():void {
        super.doActionNormal();

		this.velocity.x += this.acceleration.x;
		this.velocity.y += this.acceleration.y;

		/*if ((this.x <= this.width / 2 && this.velocity.x < 0) || (this.x >= this.stage.stageWidth - this.width / 2 && this.velocity.x > 0))
			this.onBorderX();

		if ((this.y <= this.height / 2 && this.velocity.y < 0) || (this.y >= stage.stageHeight - this.height / 2 && this.velocity.y > 0))
			this.onBorderY();*/

		this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    protected onBorderX ():void {

    }

    protected onBorderY ():void {

    }

}
