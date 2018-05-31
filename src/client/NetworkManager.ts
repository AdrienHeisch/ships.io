import * as io from 'socket.io-client';

import Events from '../shared/net/Events';
import GameObject from '../shared/gameobjects/GameObject';

export default class NetworkManager {

    private static socket:SocketIOClient.Socket;

    public static init ():void {
        NetworkManager.socket = io.connect(window.location.href);
        NetworkManager.addListeners(NetworkManager.socket);
    }

    private static addListeners (pSocket:SocketIOClient.Socket):void {
        pSocket.on(Events.GameData, (pData:any) => GameObject.setData(pData))
    }

}