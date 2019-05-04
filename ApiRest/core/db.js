var sqlDb = require("mssql");
var settings = require("../settings");

exports.executeSql = function (Sql, Callback) {
    //console.log("SQL " + Sql);
    const conn = new sqlDb.ConnectionPool(settings.dbConfig);
    conn.connect()
    .then(function () {
        var req = new sqlDb.Request(conn);
        req.query(Sql)
            .then(function (recordset) {
                Callback(recordset);
            })
            .catch(function (err) {
                callback(null, err);
            });
    })
    .catch(function (err) {
        callback(null, err);
    });
};

