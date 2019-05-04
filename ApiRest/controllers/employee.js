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
};

exports.get = function (req, resp, empno) {
    db.executeSql("SELECT * FROM emp where id=" + empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
        resp.end();
    });
};

exports.add = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not Valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO emp (empno, ename, sal, Deptno) VALUES";
            sql += util.format("(%d,'%s','%d','%d')", data.empno, data.ename, data.sal, data.Deptno);
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
        httpMsgs.show500(req, resp, ex);
    }
};

exports.update = function (req, resp, reqBody) {
};

exports.delete = function (req, resp, reqBody) {
};