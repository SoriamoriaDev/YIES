const Evaluation = require('../models/Evaluation');




/**
 * GET /account/dashboard
 * Dashboard page.
 */




exports.getDashboard = (req, res) =>{
  Evaluation.find({'evaluee_id': req.user._id}, function (err, doc) {
    if (err) {
      console.log('error, no entry found');
    };
    res.render('account/dashboard', {title: 'Dashboard', items: doc});
  }).sort({_id:-1});
};

