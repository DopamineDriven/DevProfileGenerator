//require filesystem (fs) https://nodejs.org/api/fs.html
const fs = require("fs");

//require inquirer to ask the user questions
//https://www.npmjs.com/package/inquirer
const inquirer = require("inquirer");

//require convertFactory to convert HTML to PDF
//https://www.npmjs.com/package/electron-html-to
const convertFactory = require('electron-html-to');

//require open https://www.npmjs.com/package/open
const open = require("open");

//require path to invoke executables for any modules
const path = require('path');

//require api.js file 
const api = require("./api")

//require dynamicHTML file
const dynamicHTML = require("./dynamicHTML")

//ask a series of two questions
const preguntas = [
    {
        type: "input",
        name: "github",
        message: "What's your GitHub username?"
    },
    {
        type: "list",
        name: "color",
        message: "What's your favorite color?",
        choices: ["blue", "red", "green", "pink"]
    }
];
//process.cwd used to resolve relative paths from callback containing two arguments
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
};

function init() {
    inquirer.prompt(preguntas).then(({github, color}) => {
        console.log("Searching...");

        api 
            .getUser(github)
            .then(response =>
                api.getTotalStars(github).then(stars => {
                    return dynamicHTML ({
                        stars,
                        color,
                        //spread syntax used
                        ...response.data
                    });
                })
            )
            .then(html => {
                const conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                });

            conversion({html}, function(err, result) {
                if (err) {
                    return console.error(err);
                };
                let num = 0;
                
                while (fs.existsSync(path.join(__dirname, `resume_${color}_${num}.pdf`))) {
                    num++
                };
                result.stream.pipe(
                    fs.createWriteStream(path.join(__dirname, `resume_${color}_${num}.pdf`))
                    );
                    //terminates convertPDF process
                    conversion.kill();

                    open(path.join(process.cwd(), `resume_${color}_${num}.pdf`));
                });

        });
    });
};

init();