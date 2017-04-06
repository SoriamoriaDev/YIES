const Survey = require('../models/Survey');

/**
 * GET /
 * Survey.
 */
exports.getSurvey = (req, res, next) => {
  var id = req.query.permalink;
  console.log(id);
  Survey.find({'permalink': id}, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    res.render('survey', {title:'Evaluation', items: doc});
  })
};

/**
 * 
 * POST /
 * Survey.
 */

exports.postSurvey = (req, res, next) => {
  Survey.findById(req.body.survey_id, (err, survey) => {
    if (err) { return next(err); }

    survey.last_modified = Date.now();
    survey.open = false;

    var max_questions = req.body.number_questions;
    
    for (i = 0; i < max_questions ; i++) {
      survey.scores.push(req.body.answer[i]);

    }
    
    survey.save();
    res.redirect('/thanks_feedback');
  });
};