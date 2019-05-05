var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs"); 

exports.getestados = function (req, res) {
    console.log("llego a getestados");
    db.executeSql("SELECT * FROM emp", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, res, data);
        }
        res.end();
    });
};

//    getciudades: function (req, res) {
//        //do something
//    }
//};