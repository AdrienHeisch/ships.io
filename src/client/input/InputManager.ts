export default interface InputManager {

    init ():void;
    stop ():void;

    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;
    space:boolean;
    
}
