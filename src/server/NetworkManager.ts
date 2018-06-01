import * as socketio from 'socket.io';
import { Server } from 'http';

import config from '../../config/server.json';

import Events from '../shared/net/Events';
import GameObject from '../shared/gameobjects/GameObject';
import Ship from './../shared/gameobjects/sprites/Ship';

export default class NetworkManager {

    private static io:SocketIO.Server;

    private static updateInterval:NodeJS.Timer;

    public static init (pServer:Server):void {
        NetworkManager.io = socketio(pServer);
        NetworkManager.io.sockets.on('connect', (pSocket:SocketIO.Socket) => {
            console.log('new client !');
            pSocket.on(Events.Ping, () => pSocket.emit(Events.Ping));
            pSocket.on(Events.Input, (pInput:ShipInput) => {
                (GameObject.list[0] as Ship).setInput(pInput);
                pSocket.broadcast.emit(Events.Input, pInput);
            });
        });

        NetworkManager.resume();
    }

    public static resume ():void {
        NetworkManager.updateInterval = setInterval(NetworkManager.sendGameData, 1000 / config.updateFreq);
    }

    public static stop ():void {
        clearInterval(NetworkManager.updateInterval);
    }

    private static sendGameData (pSocket?:SocketIO.Socket):void {
        if (pSocket) pSocket.emit(Events.GameData, GameObject.getData());
        else NetworkManager.io.sockets.emit(Events.GameData, GameObject.getData());
    }

}