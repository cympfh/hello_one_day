var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  fs.readFile('./routes/index.html', 'utf8', function (err, buf) {
    if (err) {
      res.end("something wrong (index)");
    } else {
      res.end(buf);
    }
  });
});

module.exports = router;
