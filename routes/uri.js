var N = 36; // 10 + 26

exports.idx2url = function (n) {
  return 'http://54.65.80.167/' + n.toString(N);
};

exports.url2idx = function (url) {
  var re = /\/([0-9a-z]*)$/;
  var id = url.match(re)[1];
  var idx = parseInt(id, N);
  return idx;
};

