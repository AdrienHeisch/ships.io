import http from 'http';
import express from 'express';
import expresslfs from 'expresslfs';

import oids from './oids.json';

import NetworkManager from './NetworkManager';
import GameManager from '../shared/GameManager';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

export default ({
    start() {
        app.use(expresslfs('https://github.com/AdrienHeisch/ships.io.git/info/lfs/objects/batch', { oids }));
        app.use(express.static('./dist/public/'));
        
        GameManager.init();
        NetworkManager.init(server);

        server.listen(port);

        console.log('Listening on port', port, '!');
    },
    stop() {
        server.close(() => console.log('Server stopped.'));
    }
});