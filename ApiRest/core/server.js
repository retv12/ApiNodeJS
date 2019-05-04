var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings");
var httpMsgs = require("./httpMsgs");

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, resp);
            }
            else if (req.url === "/employees") {
                emp.getlist(req, resp);
            }
            else {
                var empnoPatt = "[0-9]+";
                var patt = new RegExp("/employees/" + empnoPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(empnoPatt);
                    var empno = patt.exec(req.url);
                    emp.get(req, resp, empno);
                }
                else {
                    httpMsgs.show404(req, resp);
                }
            }
            break;
        case "POST":
            if (req.url === "/employees") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7)//10M
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.add(req, resp, reqBody);
                });
            } else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
        default:
            httpMsgs.show405(req, resp);
            break;

    }
}).listen(settings.webport, function () {
    console.log("Started listening at: " + settings.webport);
});