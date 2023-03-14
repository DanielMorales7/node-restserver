import express from 'express';
import cors from 'cors';
import router from '../routes/user.js';


class  Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/usuarios';

        //Middelware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        // Lectura y Parseo del código ---> esto se habilita cuando es formato tipo json
        this.app.use(express.json());

        //Directorio Publico --> esto hace referencia al directorio raíz,
        // si se tiene otra cosa se podrá modificar
        this.app.use( express.static('public') )
    }

    routes(){

        this.app.use(this.usersRoutePath, router)
      
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

export default Server;