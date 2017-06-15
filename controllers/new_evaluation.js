const Evaluation = require('../models/Evaluation');
const Survey = require('../models/Survey');
const nodemailer = require('nodemailer');
const moment = require('moment');


/**
 * GET /
 * Evaluation 1.
 */

exports.index = (req, res) => {
  res.render('new_evaluation_1', {
    title: 'New Evaluation'
  });
}

/**
 * POST /
 * Evaluation 1.
 */


exports.postNewEvaluation1 = (req, res, next) =>
{
    /*
    // TURN TIMEPICKER DATE INTO VALID ISO DATE FORMAT
    var deadline = req.body.deadline;
    //console.log("Deadline to DB : " + deadline);
    var deadline2 = moment(deadline).toISOString();
    //console.log("Deadline after Moment and  ISO: " + deadline2);
*/
    // CREATE NEW EVALUATION
    var newEvaluation = new Evaluation();

    newEvaluation.email = req.body.email;
    newEvaluation.first_name = req.body.first_name;
    newEvaluation.last_name = req.body.last_name;
    newEvaluation.job_title = req.body.job_title;
    newEvaluation.company = req.body.company;
    newEvaluation.department = req.body.department;
    newEvaluation.evaluee_id = req.body.evaluee_id;
    newEvaluation.campaign = req.body.campaign;
    newEvaluation.deadline = req.body.deadline;
    newEvaluation.last_modified = req.body.last_modified;
    newEvaluation.status = "Not launched";

    newEvaluation.save();
    res.redirect('/new_evaluation_2');
}
/**
 * GET /
 * Evaluation 2.
 *
 */

exports.getNewEvaluation2 = (req, res, next) => {

    Evaluation.find({'evaluee_id': req.user._id}, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        res.render('new_evaluation_2', {title:'New Evaluation', items: doc});
    }).sort({_id:-1}).limit(1);
};


/**
 * POST /
 * Evaluation 2.
 *
 */

exports.postNewEvaluation2 = (req, res, next) => {
    Evaluation.findById(req.body.evaluation_id, (err, evaluation) => {
        if (err) { return next(err); }
        
    evaluation.last_modified = req.body.last_modified || '';
    evaluation.intro_text = req.body.intro_text || '';

    var max_questions = req.body.number_questions;
    for (i = 0; i < max_questions ; i++) {
        evaluation.questions.push(req.body.question[i]);

    }
    evaluation.save();
    res.redirect('/new_evaluation_3');
        
    })
};

/**
 * GET /
 * Evaluation 3.
 *
 */


exports.getNewEvaluation3 = (req, res, next) => {

    Evaluation.find({'evaluee_id': req.user._id}, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        res.render('new_evaluation_3', {title:'New Evaluation', items: doc});
    }).sort({_id:-1}).limit(1);
};


/**
 * POST /
 * Evaluation 3.
 *
 */

exports.postNewEvaluation3 = (req, res, next) => {
    Evaluation.findById(req.body.evaluation_id, (err, evaluation) => {
        if (err) { return next(err); }
        
        evaluation.last_modified = req.body.last_modified;
        evaluation.surveys_total = req.body.number_evaluers;

        /** RECORD EACH EVALUER DYNAMICALLY*/
        var max = req.body.number_evaluers;
        for (i = 0; i < max; i++) {

            evaluation.evaluers.push({
                email: req.body.email[i],
                first_name: req.body.first_name[i],
                last_name: req.body.last_name[i],
                job_title: req.body.job_title[i],
                company: req.body.company[i],
                department: req.body.department[i]
            });
        }

        /** RECORD THE SUPERVISOR*/

            evaluation.supervisor.push({
                email: req.body.email3,
                first_name: req.body.first_name3,
                last_name: req.body.last_name3,
                job_title: req.body.job_title3,
                company: req.body.company3,
                department: req.body.department3
            });


        evaluation.save();
        res.redirect('/new_evaluation_4');
    });
};

/**
 * GET /
 * Evaluation 4.
 *
 */


exports.getNewEvaluation4 = (req, res, next) => {

    Evaluation.find({'evaluee_id': req.user._id}, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }

        /** POPULATE NUMBER OF EVALUERS*/
        //console.log(doc);
        var evaluers = doc[0].evaluers;
        //console.log(evaluers);
        var numberEvaluers = evaluers.length;
        //console.log(numberEvaluers);

        res.render('new_evaluation_4', {title:'New Evaluation', items: doc, eval: numberEvaluers});
    }).sort({_id:-1}).limit(1);
};


/**
 * POST /
 * Evaluation 4.
 *
 */

exports.postNewEvaluation4 = (req, res, next) => {

/** Update status Evaluation */
Evaluation.findById(req.body.evaluation_id, (err, evaluation) => {
        if (err) { return next(err); }

        evaluation.last_modified = req.body.last_modified || '';
        evaluation.status = "In process";
        evaluation.save();

/** Create Survey document for each evaluer*/


        var allevaluers = evaluation.evaluers;
        console.log(allevaluers);
        for ( i=0; i < allevaluers.length; i++ ){
            var newSurvey = new Survey;
            newSurvey.evaluer.email = evaluation.evaluers[i].email;
            newSurvey.evaluer.first_name = evaluation.evaluers[i].first_name;
            newSurvey.evaluer.last_name = evaluation.evaluers[i].last_name;
            newSurvey.evaluer.job_title = evaluation.evaluers[i].job_title;
            newSurvey.evaluer.company = evaluation.evaluers[i].company;
            newSurvey.evaluer.department = evaluation.evaluers[i].department;
            newSurvey.evaluation_id = evaluation._id;
            newSurvey.permalink = evaluation._id+i;
            newSurvey.intro_text = evaluation.intro_text;
            newSurvey.questions = evaluation.questions;
            newSurvey.open = true;
            newSurvey.deadline = evaluation.deadline;
            newSurvey.first_name  = evaluation.first_name;
            newSurvey.last_name  = evaluation.last_name;
            newSurvey.job_title  = evaluation.job_title;
            newSurvey.company  = evaluation.company;
            newSurvey.department  = evaluation.department;
            newSurvey.campaign  = evaluation.campaign;
            newSurvey.save();
        }


/** SEND EMAIL TO EACH EVALUER WITH LINK TO SURVEY */

const transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: "postmaster@mg.yies.co",
        pass: "2365dce523d84b39dad54ede5a89dde9"
    }
});
    
        /**  verify connection configuration */
        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Connected. Server can now send messages');
            }
        });

        /**  loop for sending email */
    for (i=0 ; i < allevaluers.length ; i++) {

        var d = evaluation.deadline;
        var lastDay = moment(d).format('DD/MM/YY HH:mm');

        const mailOptions = {
            to: evaluation.evaluers[i].email,
            from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
            subject: 'Feedback needed on ' + evaluation.first_name + ' ' + evaluation.last_name + ' performance',
            text: 'Hello ' + evaluation.evaluers[i].first_name + ',' + '\n\n' +
                evaluation.intro_text + '\n\n' +
                "Click on the link below, to share you feedback:" + '\n' +
                process.env.APP_URL + "/survey?permalink=" + evaluation._id + i + '\n\n' +
                "The deadline for answering is the:" + '\n' +
                lastDay
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err){
                console.log(err);
            }
            /*if (err) {
                req.flash('errors', {msg: err.message});
                return res.redirect('/new_evaluation_4');
            }*/
            console.log("One email sent!");
            //req.flash('success', {msg: 'Evaluation has been launched successfully!'});
        });

    }

        /**  send email to admin when a survey is started */
        const mailOptions2 = {
            to: 'maxime.fontanille@gmail.com',
            from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
            subject: 'Evaluation started for ' + evaluation.first_name + ' ' + evaluation.last_name,
            text: 'Data : ' + evaluation + '\n\n'
        };

        transporter.sendMail(mailOptions2, (err) => {
            if (err){
                console.log(err);
            }
            /*if (err) {
             req.flash('errors', {msg: err.message});
             return res.redirect('/new_evaluation_4');
             }*/
            console.log("One email sent!");
            //req.flash('success', {msg: 'Evaluation has been launched successfully!'});
        });





/** FINISH and redirect to same page */

        res.redirect('/new_evaluation_4');
    }
)};
