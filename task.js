const nodemailer = require('nodemailer');


function sendEmail() {

        console.log("Starting to connect...");

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


        const mailOptions = {
            to: 'maxime.fontanille@gmail.com',
            from: `YIES Insightful Talent Evaluation <noreply@yies.co>`,
            subject: 'Scheduled email works',
            text: 'Cool' +'\n\n\n' + "/survey?permalink="
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