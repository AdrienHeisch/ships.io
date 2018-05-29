import Timer from './Timer';
import Ship from './gameobjects/sprites/Ship';
import Bullet from './gameobjects/sprites/Bullet';
import GameObject from './gameobjects/GameObject';

export default ({

    timer: new Timer(),

    init () {
        let ship = new Ship();
        ship.x = 50;
        ship.y = 50;

        let bullet = new Bullet();
        bullet.x = 100;
        bullet.y = 50;
        bullet.setModeNormal();

        setInterval(this.step, 16)
    },

    step () {
        for (let lGameObject of GameObject.list) lGameObject.doAction();
    }
    
})