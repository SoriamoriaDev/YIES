const Evaluation = require('../models/Evaluation');
const Survey = require('../models/Survey');
const nodemailer = require('nodemailer');


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
    newEvaluation.status = "Not Launched";

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
        
        evaluation.last_modified = req.body.last_modified || '';

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
        console.log(doc);
        var evaluers = doc[0].evaluers;
        console.log(evaluers);
        var numberEvaluers = evaluers.length;
        console.log(numberEvaluers);

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
            newSurvey.evaluation_id = evaluation._id;
            newSurvey.permalink = evaluation._id+i;
            newSurvey.intro_text = evaluation.intro_text;
            newSurvey.evaluer.first_name = evaluation.evaluers[i].first_name;
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
    service: 'Gmail',
    auth: {
        user: "soriamoriaapp@gmail.com",
        pass: "123456Soria"
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

        const mailOptions = {
            to: evaluation.evaluers[i].email,
            from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
            subject: 'Feedback needed on ' + evaluation.first_name + ' performance',
            text: "http://localhost:3000/survey?permalink=" + evaluation._id + i
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

/** FINISH and redirect to same page */

        res.redirect('/new_evaluation_4');
    }
)};
