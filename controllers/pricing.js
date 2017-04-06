

/**
 * GET /
 * Pricing.
 */
exports.getPricing = (req, res, next) => {
  res.render('pricing', {title: 'Pricing'});
};

