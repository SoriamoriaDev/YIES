const Evaluation = require('../models/Evaluation');

/**
 * GET /
 * Sandbox.
 */
exports.getSandbox = (req, res, next) => {

var today = new Date();
var maintenant = today.toISOString();
console.log('Date now : ' + maintenant);

    // Search DB for all Evaluation with deadline > date.now
Evaluation.find({'deadline': { $gt : maintenant} }, function (err, doc) {
    if (err) {
     console.log('error, no entry found');
     };
    console.log('Number of records found : ' + doc.length);
    console.log('All the docs found : ' + doc);

// Send email to owner that "Evaluation is completed"


    res.redirect('/');
});//.sort({_id:-1});

};





// Change "notification_sent: Boolean" to True

/**
 * 
 * POST /
 * Sandbox.
 */

exports.postSandbox = (req, res, next) => {

    res.redirect('/');

};

