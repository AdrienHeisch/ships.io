import Mobile from './Mobile';
import Bullet from './Bullet';

export default class Ship extends Mobile {
    protected static readonly MAX_TURNING_SPEED:number = 0.05;
	protected static readonly TURNING_ACCELERATION_VALUE:number = 0.004;
	protected static readonly BASE_MAX_SPEED:number = 5;
	protected static readonly BASE_ACCELERATION:number = 0.2;
	protected static readonly BRAKE:number = 0.1;
    protected static readonly SELF_BRAKE:number = 0.05;

    protected shootTimer:number = 0;
    protected static readonly SHOOT_COOLDOWN:number = 20;

    private input:ShipInput = {
        up: false,
        down: false,
        left: false,
        right: false,
        shoot: false
    };

    constructor () {
        super();
    }

    public setInput (pInput:ShipInput):void {
        Object.assign(this.input, pInput);
    }

    protected shoot ():void {
        var lBullet:Bullet = new Bullet();
		this.shootTimer = Ship.SHOOT_COOLDOWN;
		lBullet.x = this.x;
		lBullet.y = this.y;
		lBullet.rotation = this.rotation;
		lBullet.velocity.setTo(Bullet.SPEED * Math.cos(this.rotation), Bullet.SPEED * Math.sin(this.rotation));
        lBullet.start();
    }




    protected doActionNormal ():void {

        super.doActionNormal();

        if (this.input.shoot && this.shootTimer == 0)
			this.shoot();
		else if (this.shootTimer != 0)
			this.shootTimer -= 1;

        /*
		this.maxSpeed = BASE_MAX_SPEED * (this.input[4] ? BOOST_MULT : 1);
		Ship.BASE_ACCELERATION = BASE_ACCELERATION * (this.input[4] ? BOOST_MULT : 1);
        */

		if ((!this.input.left && !this.input.right) || (this.input.left && this.input.right))
		{
			this.angularAcceleration = 0;
			if (this.angularSpeed > 0)
			{
				this.angularSpeed -= Ship.TURNING_ACCELERATION_VALUE;
			}
			if (this.angularSpeed < 0)
			{
				this.angularSpeed += Ship.TURNING_ACCELERATION_VALUE;
			}
		}
		else if (this.input.left)
			this.angularAcceleration = -Ship.TURNING_ACCELERATION_VALUE;
		else if (this.input.right)
			this.angularAcceleration = Ship.TURNING_ACCELERATION_VALUE;

		if ((this.angularSpeed >= Ship.MAX_TURNING_SPEED && this.angularAcceleration > 0) || (this.angularSpeed <= -Ship.MAX_TURNING_SPEED && this.angularAcceleration < 0)) this.angularAcceleration = 0;
		this.angularSpeed += this.angularAcceleration;
		this.rotation += this.angularSpeed;

		if (this.input.up)
		{
			this.acceleration.x = Ship.BASE_ACCELERATION * Math.cos(this.rotation);
			this.acceleration.y = Ship.BASE_ACCELERATION * Math.sin(this.rotation);
		}
		else
		{
			this.acceleration.setTo(0, 0);
			/*if (this.input.down)
			{
				this.acceleration.x = Ship.BRAKE * -Math.cos(this.rotation * Math.PI / 180);
				this.acceleration.y = Ship.BRAKE * -Math.sin(this.rotation * Math.PI / 180);

			}
			else*/ if (Math.abs(this.velocity.length) > Ship.SELF_BRAKE)
			{
				this.acceleration.x = Ship.SELF_BRAKE * -Math.cos(Math.atan2(this.velocity.y, this.velocity.x));
				this.acceleration.y = Ship.SELF_BRAKE * -Math.sin(Math.atan2(this.velocity.y, this.velocity.x));
			}
        }
    }

}
