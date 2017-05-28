const Evaluation = require('../models/Evaluation');
const nodemailer = require('nodemailer');
const sendEmailReportReady = require('../sendEmailReportReady.js');


/**
 * GET /
 * Sandbox.
 */
exports.getSandbox = (req, res, next) => {

    // Search DB for all Evaluation with status "In process"
Evaluation.find({'status': "In process" }, function (err, doc) {
    if (err) {
     console.log('error, no entry found');
     }
    console.log('Number of records found : ' + doc.length);
    //console.log('All the docs found : ' + doc);

    // Set status from "In Process" to "Completed" if now.Date is higher than deadline
    console.log('Date now :' + new Date());
    var counter = 0;
    for (i = 0; i < doc.length ; i++) {

        if ( new Date() > doc[i].deadline) {
            doc[i].status = "Completed";
            doc[i].notification_sent = true;
            doc[i].save();
            console.log('One Changed status!');

            // Send email to owner that "Evaluation is completed"
            sendEmailReportReady(doc[i].email);
            counter++;
        }

    }
    console.log('Total items changed: ' + counter);

    res.redirect('/');
});

};


/**
 * 
 * POST /
 * Sandbox.
 */

exports.postSandbox = (req, res, next) => {

    res.redirect('/');

};

