import express from 'express';
import http from 'http';
import expresslfs from 'expresslfs';
import oids from './oids.json';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

export default ({
    start() {
        app.use(expresslfs('https://github.com/AdrienHeisch/ships.io.git/info/lfs/objects/batch', {
            oids
        }));
        app.use(function (req, res, next) {
            console.log(req.url);
            if (req.url === '/textures.png') {
                return;
            } else next();
        });
        app.use(express.static('./dist/public/'));

        server.listen(port);

        console.log('Listening on port', port, '!');
    },
    stop() {
        server.close(() => console.log('Server stopped.'));
    }
});