var db = require('./db');
var uri = require('./uri');

var async_update = db.async_update;
var async_redirect = db.async_redirect;

exports.shorten = function (req, res) {
  if (!req || !req.body || !req.body.LongUrl) {
    res.writeHead(400, {'Content-Type': 'text/html; charset=utf8'});
    res.end("something wrong");
    return;
  }
  var n = db.getsize();
  var timestamp = (new Date()).getTime();
  var obj = {
    url: req.body.LongUrl,
    timestamp: timestamp
  };

  // response body
  var ret = {
    ShortUrl : uri.idx2url(n),
    Created: timestamp,
    LongUrl: req.body.LongUrl
  };

  async_update(obj);

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  res.end(JSON.stringify(ret));
};

exports.expand = function (req, res) {
  async_redirect(req.originalUrl, function (url_next) {
    if (url_next) {
      res.writeHead(308,
                    {'Location': url_next,
                     'Expires': (new Date).toGMTString(),
                      'Content-Type': 'text/html; charset=utf8' });
      res.end("<html><body>redirect to " + url_next + "</body></html>");
    } else {
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf8'});
      res.end("Error: not found the page");
    }
  });
};

exports.debug = function (req, res) {
  var datum = db.debug();
  if (datum.length === 0) {
    res.end("database is empty");
    return;
  }
  var buf = "index : url<br>" + datum.map(function (o, i) { return i + " : " + o.url }).join("<br>");
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  res.end(buf);
};
