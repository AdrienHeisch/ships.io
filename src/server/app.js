import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

export default ({
    start() {
        app.use(express.static('./dist/public'));
        server.listen(port);
        console.log('Listening on port', port, '!');
    },
    stop() {
        server.close(() => console.log('Server stopped.'));
    }
});