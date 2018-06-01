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
        this.io = socketio(pServer);
        this.io.sockets.on('connect', (pSocket:SocketIO.Socket) => {
            console.log('new client !');
            pSocket.on(Events.Ping, () => pSocket.emit(Events.Ping));
            pSocket.on(Events.Input, (pInput:ShipInput) => {
                (GameObject.list[0] as Ship).setInput(pInput);
                pSocket.broadcast.emit(Events.Input, pInput);
            });
        });

        this.resume();
    }

    public static resume ():void {
        this.updateInterval = global.setInterval(this.sendGameData.bind(this), 1000 / config.updateFreq);
    }

    public static stop ():void {
        clearInterval(this.updateInterval);
    }

    private static sendGameData (pSocket?:SocketIO.Socket):void {
        if (pSocket) pSocket.emit(Events.GameData, GameObject.getData());
        else this.io.sockets.emit(Events.GameData, GameObject.getData());
    }

}