db = require('../routes/db');

db.clear();

for (i = 0; i < 1000; ++i) {
  db.async_update({url: i});
}

// preserving the order?
(function () {
  var datum = require('../routes/datum.json');
  for (var i = 0; i < 1000; ++i) {
    console.assert(datum[i].url === i);
  }
}());

// redirect check
(function () {
  var datum = require('../routes/datum.json');
  for (var i = 0; i < 1000; ++i) {
    var id = i.toString(36);
    db.async_redirect('/' + id, function (url) {
      console.assert(url === i);
    });
  }
}());

db.clear();

console.warn('passed');
