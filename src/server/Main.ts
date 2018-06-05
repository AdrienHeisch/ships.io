import * as http from 'http';
import * as express from 'express';
import * as expresslfs from 'expresslfs';

import oids from './oids.json';

import NetworkManager from './NetworkManager';
import GameManager from '../shared/GameManager';

export default class Main {

    private static readonly app:express.Express = express();
    private static readonly server:http.Server = (http as any).createServer(Main.app);
    private static readonly port:number = Number(process.env.PORT) || 8080;

    public static init ():void {
        this.app.use(expresslfs('https://github.com/AdrienHeisch/ships.io.git/info/lfs/objects/batch', { oids }));
        this.app.use(express.static('./dist/public/'));
        
        GameManager.init();
        NetworkManager.init(this.server);

        this.server.listen(this.port);

        console.log('Listening on port', this.port, '!');
    }

    public static stop ():void {
        this.server.close(() => console.log('Server stopped.'));
    }

}

Main.init();