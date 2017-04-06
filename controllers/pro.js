const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "soriamoriaapp@gmail.com",
    pass: "123456Soria"
  }
});

/**
 * GET /
 * Pro.
 */
exports.getPro = (req, res, next) => {
  res.render('pro', {title: 'Pro Version'});
};


/**
 * POST / Pro
 * Send a contact form via Nodemailer.
 */
exports.postPro = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/pro');
  }

  const mailOptions = {
    to: 'maxime.fontanille@gmail.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Contact Form | YIES Pro enquiry',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/pro');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/pro');
  });
};
