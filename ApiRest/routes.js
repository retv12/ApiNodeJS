// Dependicias del las rutas del servicio
const express = require("express");
const router = express.Router();

// Le dice a las rutas que se manejaran json
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Archivo de mensajes
const httpMsgs = require("./core/httpMsgs");

// Se agregan los controladores
const geolocalizacion = require("./controllers/geolocalizacion");
const employee = require("./controllers/employee");

// Cache
var mcache = require('memory-cache');

var cache = (duration) => {
    return (req, res, next) => {
        let key = '__miboleto__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};
//
router.get('/', (req, res) => {
    httpMsgs.show404(req, res);
});

// rutas del proyecto

// rutas de estados
router.route('/estados').get(cache(60 * 60 * 24), geolocalizacion.getestados);
router.route('/ciudades/:idestado').get(cache(60 * 60 * 24), geolocalizacion.getciudades);

// rutas de estados
router.route('/employee').get(employee.getlist);
router.route('/employee/:empno').get(employee.get);
router.route('/employee').post(employee.add);

module.exports = router;