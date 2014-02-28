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
    res.json(json);
  } else {
    res.send(404);
    return;
  }

};
