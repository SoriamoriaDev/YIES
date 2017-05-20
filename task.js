
const nodemailer = require('nodemailer');


function sendEmail() {

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


        const mailOptions = {
            to: 'maxime.fontanille@gmail.com',
            from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
            subject: 'Scheduled email works',
            text: 'Cool it works!' +'\n\n\n'
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err){
                console.log(err);
            }
            /*if (err) {
             req.flash('errors', {msg: err.message});
             return res.redirect('/new_evaluation_4');
             }*/
            console.log("Task email sent!");
            //req.flash('success', {msg: 'Evaluation has been launched successfully!'});
        });
}

module.exports = sendEmail;