

/**
 * GET /
 * Sandbox.
 */
exports.getSandbox = (req, res, next) => {
  res.render('sandbox', {title: 'Sandbox'});
};

/**
 * 
 * POST /
 * Sandbox.
 */

exports.postSandbox = (req, res, next) => {

    res.redirect('/');

};