const dotenv = require('dotenv').config();
const mjml = require('mjml');
const sendgrid = require('@sendgrid/mail');
const handlebars = require('handlebars');
const chalk = require('chalk');
const fs = require('fs');

//Configure Sendgrid
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

//Variable setup
const userInfo = {
    name: 'Lisa',
    lastname: 'Ross',
    email: process.env.RECIPENT_EMAIL,
    people: [
        { id: 24654, name: 'Lisa Ross' },
        { id: 24655, name: 'Lisa McMillan' },
    ]
}


console.log(chalk.green('Reading template information example.js'));
const mjmlTemplateFile = fs.readFileSync(`${__dirname}/views/example.hbs`, 'utf8');
const template = handlebars.compile(mjmlTemplateFile);
const hbsHtml = template(userInfo);
const templateMarkup = mjml(hbsHtml);
if (templateMarkup.errors.length == 0) {
    const msg = {
        to: userInfo.email,
        from: {
            email: 'lisa@avenuego.com',
            name: 'Avenue'
        },
        subject: 'Sample application contact',
        html: templateMarkup.html
    }

    sendgrid.send(msg).then((response) => {
        console.log(chalk.green('Email sent!'));
    }, (error) => {
        console.log(chalk.red(error.message));
    })
} else {
    console.log(chalk.red('There are errors in the MJML markup'));
}
