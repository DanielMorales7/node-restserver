import express from 'express';
import cors from 'cors';
import routerUsers from '../routes/user.js';
import routerAuth from '../routes/auth.js';
import routerCategory from '../routes/category.js'
import { dbConnection } from '../database/config.js';
import routerProducts from '../routes/products.js';


class  Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            category:'/api/category',
            products:'/api/products'
        }

        // this.usersRoutePath = '/api/usuarios';
        // this.authPath       = '/api/auth';
        // this.categoryPath   = '/api/category';

        // Conectar base de datos
        this.conectarDB();

        //Middelware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){

        await dbConnection();
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

        this.app.use(this.paths.usuarios, routerUsers)
        this.app.use(this.paths.auth, routerAuth)
        this.app.use(this.paths.category, routerCategory)
        this.app.use(this.paths.products, routerProducts)
      
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

export default Server;