var fs = require('fs');

var datum_name = './routes/datum.json';
var datum = require('./datum.json');
var uri = require('./uri');

var ref = false;

// clear the database (for debug)
exports.clear = function () {
  console.warn('database clear');
  fs.writeFileSync(datum_name, '[]');
  datum = [];
  ref = false;
};

exports.getsize = function () {
  return datum.length;
};

exports.async_update = function (obj) {
  if (!ref) {
    ref = true; // lock
    datum.push(obj);
    var buf = JSON.stringify(datum);
    fs.writeFile(datum_name, buf, function (err) {
      if (!err) {
        delete require.cache[require.resolve('../routes/datum.json')];
        datum = require('../routes/datum.json');
      }
    });
    ref = false; // unlock
  } else {
    setTimeout(async_update, 30, obj);
  }
}

exports.async_redirect = function (url, cont) {
  if (!ref) {
    var idx = uri.url2idx(url);

    if (idx < datum.length && 0 <= idx) {
      return cont(datum[idx].url);
    }
    return cont(false);
  } else {
    // wait until unlock
    setTimeout(async_redirect, 30, url, cont);
  }
}

exports.debug = function () {
  return datum;
};
