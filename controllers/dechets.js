/**
 * GET /
 * Home page.
 */

exports.dechetsChoixJeter = function(req, res) {
  var categories = require('../datasets/dechets.json');
  res.render('dechetsChoixJeter', {
    title: 'Jeter vos déchets',
    cats: categories
  });
};
