const dotenv = require('dotenv').config();
const mjml = require('mjml');
const sendgrid = require('@sendgrid/mail');
const handlebars = require('handlebars');
const chalk = require('chalk');
const fs = require('fs');

//Configure Sendgrid
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

//Variable setup
const content = {
    email: process.env.RECIPENT_EMAIL,
    content: {
        p1: "Nous sommes heureux de votre participation dans le programme des avantage de carrière.",
        p2: "Bienvenue à votre première vidéo de la série sur les conversations de carrière.",
        p3: "Au cours des prochaines semaines, vous recevrez trois vidéos - toutes conçues pour vous aider à poursuivre votre apprentissage et à continuer sur votre lancée afin de créer la carrière que vous souhaitez.",
        h: "Vidéo n ° 1 : Prendre contact",
        p4: "Si vous êtes comme la plupart des participants, vous avez beaucoup de momentum. Dans cette vidéo, nous vous donnons des conseils supplémentaires pour vous aider à surmonter toute résistance à la prise de contact avec les personnes les plus importantes de votre environnement."
    }
}

console.log(chalk.green('Reading template information index.js'));

const mjmlTemplateFile = fs.readFileSync(`${__dirname}/views/video.mjml`, 'utf8');
const template = handlebars.compile(mjmlTemplateFile);

const hbsHtml = template(content);
const templateMarkup = mjml(hbsHtml);
if (templateMarkup.errors.length == 0) {
    const msg = {
        html: templateMarkup.html
    }

    var stream = fs.createWriteStream("./dist/video.html");
    stream.once('open', function (fd) {
        stream.write(templateMarkup.html);
        stream.end();
    });

    // sendgrid.send(msg).then((response) => {
    //     console.log(chalk.green('Email sent!'));
    // }, (error) => {
    //     console.log(chalk.red(error.message));
    // })
} else {
    console.log(chalk.red('There are errors in the MJML markup'));
}
