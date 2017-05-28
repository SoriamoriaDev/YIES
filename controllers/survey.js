const Survey = require('../models/Survey');
const Evaluation = require('../models/Evaluation');
const nodemailer = require('nodemailer');
const sendEmailReportReady = require('../sendEmailReportReady.js');

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

  });


  Evaluation.findById(req.body.age_of_the_captain, (err, evaluation) => {
    if (err) { return next(err); }

    evaluation.last_modified = Date.now();

    // ADDING ONE UP TO THE SURVEY COUNTER
    var counter = evaluation.surveys_completed;
    console.log("Counter before addition : " + counter);
    counter++;
    console.log("Counter after addition : " + counter);
    evaluation.surveys_completed = counter;

    // CHECK IF ALL FEEDBACK GIVEN  AND NOTIFY OWNER
    if (counter == evaluation.surveys_total){
        console.log("Yes, Completed is equal to Total");

        // CHANGE STATUS TO COMPLETED
        evaluation.status = "Completed";
        // SEND EMAIL TO OWNER
        sendEmailReportReady(evaluation.email);
    }
    evaluation.save();
    res.redirect('/thanks_feedback');
  });
  

};