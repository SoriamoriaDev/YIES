/**
 * GET /
 * No record found.
 */
exports.getNo_record_found = (req, res) => {
  res.render('no_record_found', {
    title: 'Sorry, no record found'
  });
};

/**
 * GET /
 * Thanks for feedback.
 */
exports.getThanks_feedback = (req, res, next) => {
  res.render('thanks_feedback', {title: 'Thank you'});
};
