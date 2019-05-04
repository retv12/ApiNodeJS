var settings = require("../settings");

exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal error occured", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body> 500: Internal Error. Details: " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal error occured", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "ERROR occured:" + err }));
    }
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data.recordsets));
    }
    resp.end();
};

exports.show405 = function (req, resp,) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body> 405: Method not supported.</body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "405: Method not supported." }));
    }
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found </body ></html > ");
    }
    else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "404: Resource not found." }));
    }
    resp.end();
};

exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity  too Large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413:Request Entity  too Large</body ></html > ");
    }
    else {
        resp.writeHead(413, "Request Entity Too Lange", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "413: Request Entity Too Lange." }));
    }
    resp.end();
};

exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found </body ></html > ");
    }
    else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found:" }));
    }
    resp.end();
};

exports.send200 = function (req, resp) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
};