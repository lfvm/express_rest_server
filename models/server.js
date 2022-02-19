/*
    Esta clase es la clase base para el server, en ella se crean los metodos para crear el server,  escuchar, definir las rutas, etc.

    Para incializar un server se importa express y se crea una variable
    llamada app, referenciando a express.
    Despues solo llamamos el metodo listen en algun puerto definido 
*/
const express = require('express');
const cors = require('cors')
require('dotenv').config()


class Server {


    constructor() {

        // En el constructor se inicializa el server
        this.app = express(); 
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        // Inicializar las rutas
        this.appRoutes = {
            'usuarios' : '/api/usuarios',
        };

        this.routes();

    }

    middlewares() { 

        //Establecer el directorio publico
        this.app.use( express.static('public') )

        //cors
        this.app.use(cors())
        
        //Tipado JSON
        this.app.use( express.json() );
    
    }


    //  ? Metodo para definir rutas 
    routes () {

      //Rutas del usuario
      this.app.use(this.appRoutes.usuarios , require('../routes/user') );



    }

    //  ? Metodo para esuchar el server
    listen () {
        this.app.listen( this.port, () => {
            console.log(`App corriendo en http://localhost:${this.port}`)
        });
    }


}



module.exports = Server;