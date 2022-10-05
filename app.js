import * as dotenv from 'dotenv'
dotenv.config()

import { Server } from './models/server.js';



const server = new Server();


server.listen();


console.log('Hola Mundo');