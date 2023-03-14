
import dotenv from  'dotenv';
import Server from './models/server.js'

dotenv.config(); 

//crear el servidor

const server = new Server();

server.listen();

//puerto
