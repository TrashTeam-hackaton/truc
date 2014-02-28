var fs = require('fs');

/**
 * GET /opendata/:id
 */

exports.getOpenData = function(req, res) {

  var datasetPath = __dirname + '/../datasets/' + req.params.id;
  var dechet = req.query.dechet;
  if (fs.existsSync(datasetPath)) {
    var json = {};
    try {
      json = JSON.parse(fs.readFileSync(datasetPath));
    } catch (err) {
      res.send(500, err);
      return;
    }
    if (dechet) {
      var isAllowed = function (dechetterie) {
        return dechetterie.allowed.indexOf(dechet) !== -1;
      };
      json = json.filter(isAllowed);
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


/**
 * Liste des déchetteries compatibles avec le déchet passé en paramètre
 * GET /opendata/dechetteries_cugn.json?dechet=:dechet
 */
exports.getCompatibleDechetteries = function(req, res) {
  var datasetPath = __dirname + '/../datasets/dechetteries_cugn.json';
  var dechet = req.params.dechet;
  console.log("compatible("+dechet+")");

  if (fs.existsSync(datasetPath)) {
    var json = {};
    try {
      json = JSON.parse(fs.readFileSync(datasetPath));
    } catch (err) {
      res.send(500, err);
      return;
    }

    var isAllowed = function (dechetterie) {
      return dechetterie.allowed.indexOf(dechet) !== -1;
    };
    json.filter(isAllowed);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(json);
  } else {
    res.send(404);
    return;
  }
};