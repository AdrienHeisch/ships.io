import config from '../../config/client.json';

import * as io from 'socket.io-client';

import Events from '../shared/net/Events';
import GameObject from '../shared/gameobjects/GameObject';
import InputManager from './input/InputManager';
import Ship from '../shared/gameobjects/sprites/Ship';

export default class NetworkManager {

    private static socket:SocketIOClient.Socket;
    private static pingInterval:number;
    private static pingSent:boolean = false;

    public static init ():void {
        this.socket = io.connect(window.location.href);
        
        this.socket.on(Events.GameData, (pData:any) => GameObject.setData(pData));
        this.socket.on(Events.Input, (pInput:ShipInput) => { if (GameObject.list[0]) (GameObject.list[0] as Ship).setInput(pInput); });
    
        this.pingInterval = window.setInterval(this.ping.bind(this), 1000 / config.pingFreq);
    }

    public static sendInputs (pManager:InputManager):void {
        this.socket.emit(Events.Input, {
            up:pManager.up,
            down:pManager.down,
            left:pManager.left,
            right:pManager.right
        } as ShipInput);
    }

    private static ping ():void {

        this.socket.on(Events.Ping, () => {
            this.socket.off(Events.Ping);
            this.pingSent
        });
        this.socket.emit(Events.Ping);
    }

}