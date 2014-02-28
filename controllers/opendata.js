var fs = require('fs');

/**
 * GET /opendata/:id
 */

exports.getOpenData = function(req, res) {

  var datasetPath = __dirname + '/../datasets/' + req.params.id;
  if (fs.existsSync(datasetPath)) {
    var json = {};
    try {
      json = JSON.parse(fs.readFileSync(datasetPath));
    } catch (err) {
      res.send(500, err);
      return;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(json);
  } else {
    res.send(404);
    return;
  }

};

/**
 * Liste des datasets d'opendata
 */
var glob = require("glob");

exports.getOpenDataList = function(req, res) {
  var datasetsPath = __dirname + '/../datasets/';
  glob(datasetsPath + "/*.json", {}, function (err, files) {
    if (err) return res.send(500, err);
    
    files = files.map(function (elt) {
      return '/opendata/' + elt.split('/').pop();
    });



    res.json(files);
  });
};
