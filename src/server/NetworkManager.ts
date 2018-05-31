import * as socketio from 'socket.io';
import { Server } from 'http';

import Events from '../shared/net/Events';
import GameObject from '../shared/gameobjects/GameObject';

import config from '../../config/server.json';

export default class NetworkManager {

    private static io:SocketIO.Server;

    private static interval:NodeJS.Timer;

    public static init (pServer:Server):void {
        NetworkManager.io = socketio(pServer);
        NetworkManager.io.sockets.on('connect', socket => {});
        NetworkManager.resume();
    }

    public static resume ():void {
        NetworkManager.interval = setInterval(NetworkManager.sendGameData, 1000 / config.updateFreq);
    }

    public static stop ():void {
        clearInterval(NetworkManager.interval);
    }

    private static sendGameData (pSocket?:SocketIO.Socket):void {
        if (pSocket) pSocket.emit(Events.GameData, GameObject.getData());
        else NetworkManager.io.sockets.emit(Events.GameData, GameObject.getData());
    }

}