var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs"); 
var util = require("util");

exports.getlist = function (req, resp) {
    db.executeSql("SELECT * FROM emp", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
        resp.end();
    });
}; // Trae todos los valores de la tabla

exports.get = function (req, resp) {
    // esto lee el parametro del url -- req.params.empno
    db.executeSql("SELECT * FROM emp where id=" + req.params.empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
        resp.end();
    });
}; // Trae un valor con el ID via parametro

exports.add = function (req, resp) {
    try {
        if (!req.body) throw new Error("Input not Valid");
        if (req.body) {
            var sql = "INSERT INTO emp (empno, ename, sal, Deptno) VALUES";
            sql += util.format("(%d,'%s','%d','%d')", req.body.empno, req.body.ename, req.body.sal, req.body.Deptno);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
    } catch (ex) {
        console.log("Error");
        httpMsgs.show500(req, resp, ex);
    }
}; // agrega registro // req.body contiene el json eviados

exports.update = function (req, resp, reqBody) {
};

exports.delete = function (req, resp, reqBody) {
};