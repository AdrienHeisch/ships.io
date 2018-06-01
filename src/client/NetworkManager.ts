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
        NetworkManager.socket = io.connect(window.location.href);
        NetworkManager.addListeners(NetworkManager.socket);
    
        NetworkManager.pingInterval = window.setInterval(NetworkManager.ping, 1000 / config.pingFreq);
    }

    public static sendInputs (pManager:InputManager):void {
        NetworkManager.socket.emit(Events.Input, {
            up:pManager.up,
            down:pManager.down,
            left:pManager.left,
            right:pManager.right
        } as ShipInput);
    }

    private static ping ():void {

        NetworkManager.socket.on(Events.Ping, () => {
            NetworkManager.socket.off(Events.Ping);
            NetworkManager.pingSent
        });
        NetworkManager.socket.emit(Events.Ping);
    }

    private static addListeners (pSocket:SocketIOClient.Socket):void {
        pSocket.on(Events.GameData, (pData:any) => GameObject.setData(pData));
        pSocket.on(Events.Input, (pInput:ShipInput) => { if (GameObject.list[0]) (GameObject.list[0] as Ship).setInput(pInput); });
    }

}