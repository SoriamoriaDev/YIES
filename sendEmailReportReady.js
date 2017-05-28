const nodemailer = require('nodemailer');


function sendEmailReportReady(a) {

    console.log("Starting to connect...");

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

    /**  EMAIL TO THE OWNER OF EVALUATION */
    const mailOptions = {
        to: a,
        from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
        subject: 'Your Evaluation is done.',
        text: 'Your evaluation is completed. The YIES report is now available on the dashboard.' + '\n\n' +
        'Follow this link to your dashboard: '+ '\n' +
        process.env.APP_URL + "/login"
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err){
            console.log(err);
        }
        /*if (err) {
         req.flash('errors', {msg: err.message});
         return res.redirect('/new_evaluation_4');
         }*/
        console.log("One report have been completed and email sent to owner!");
        //req.flash('success', {msg: 'Evaluation has been launched successfully!'});
    });

    /**  EMAIL TO MAX */
    const mailOptions2 = {
        to: 'maxime.fontanille@gmail.com',
        from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
        subject: 'One Evaluation is ready.',
        text: 'One email has been send to : '+ a + ' to tell him the report is ready.'
    };

    transporter.sendMail(mailOptions2, (err) => {
        if (err){
            console.log(err);
        }
        /*if (err) {
         req.flash('errors', {msg: err.message});
         return res.redirect('/new_evaluation_4');
         }*/
        console.log("One report have been completed and email sent to Max as notification!");
        //req.flash('success', {msg: 'Evaluation has been launched successfully!'});
    });
}

module.exports = sendEmailReportReady;
