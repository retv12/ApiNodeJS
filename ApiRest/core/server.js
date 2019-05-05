// Se anexa las dependecias del proyecto
// Express ayuda a crear el servidor y 
// las rutas del proyecto
const express = require("express");
const app = express();

//  Archivo de rutas del servicio
const apiRouter = require("../routes");

//  Archivo de mensajes
const httpMsgs = require("../core/httpMsgs");

//  Archivo de configuracion del proyecto
const settings = require("../settings");

// Se agregar al servicio las rutas dentro de API
// http://localhost:9000/api
app.use('/api', apiRouter);

// Se inicia el servicio
app.listen(settings.webport, function () {
    console.log("Node server running on " + settings.webport);
});

// Mensaje del servicio si no das una ruta
app.get('/', function (req, res) {
    httpMsgs.showHome(req, res);
});
