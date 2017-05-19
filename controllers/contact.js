const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: "postmaster@mg.yies.co",
    pass: "2365dce523d84b39dad54ede5a89dde9"
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('location', 'Bug location cannot be blank').notEmpty();
  req.assert('description', 'Bug description cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  const mailOptions = {
    to: 'max77869506+lnds636trjdwu6jgpvgs@boards.trello.com',
    //from: `${req.body.name} <${req.body.email}>`,
    subject: req.body.location,
    text:  "Name : " + req.body.name + '\n\n' +
            "Email : " + req.body.email + '\n\n' +
            "Bug description : " + req.body.description
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Bug report has been sent successfully. Thanks!' });
    res.redirect('/contact');
  });
};
