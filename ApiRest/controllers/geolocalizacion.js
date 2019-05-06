var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs"); 

exports.getestados = function (req, res) {
    db.executeSql("select idestado,nombreestado from Geolocalizacion group by idestado,nombreestado order by nombreestado", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, res, data);
        }
        res.end();
    });
};

exports.getciudades = function (req, res) {
    // esto lee el parametro del url -- req.params.idestado
    db.executeSql("select idciudad, nombreciudad from Geolocalizacion where idestado =" + req.params.idestado + " order by nombreciudad ", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, res, data);
        }
        res.end();
    });
};