// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Hey Welcome to your README generator! Lets start out with your full name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name! You need to give yourself credit for your work');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: inputGithub => {
            if (inputGithub) {
                return true;
            } else {
                console.log('You have to link your GitHub repo so people know where to find more of your awesome code');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('If anyone needs to get in touch, you should provide a way for them to reach you');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Every project must have a title. Please try again.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter your project description here:",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('It is required to provide a description of your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please provide instructions to ensure people have the right software to run your program!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Usage instructions are vital. Please try again.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to this project?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please provide instructions on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Describe the tests written for your application and how to use them:',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide instructions on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'What license do you want?',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// Function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {

        fs.writeFile('./utils/README.md', data, err => {

            if (err) {
                reject (err);

                return;
            }

            resolve({
                ok: true,
                message: console.log('You Did It! Now fly over to the "utils" folder to see your README!')
            });
        })
    })
}


const init = () => {
    return inquirer.prompt(questions);
}

init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(err => {
    console.log(err);
})