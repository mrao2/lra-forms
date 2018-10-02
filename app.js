const express = require("express");
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const path = require('path')
const nodemailer = require("nodemailer")

const app = express();

// View Engine setup
app.engine('handlebars', exphbs());
app.set('view engine', "handlebars");

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('form');
});

app.post('/send', (req, res) => {
    //console.log(req.body);
    const output = `
    <p>New Application!</p>
    <h3>Form Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.stlvacancy.com',
        port: "portname",
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"StlVacancy" <app@stlvacancy.com>', // sender address
        to: 'test@lra.com', // list of receivers
        subject: 'New Application', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:"Your application has been sent!"})
});

app.listen(8000, () => console.log("Server started...."));