/**
 * GET /
 * Home page.
 */

exports.dechetsChoixJeter = function(req, res) {
  res.render('dechetsChoixJeter', {
    title: 'Jeter vos déchêts'
  });
};
