const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function firstQuestions() {
    
    function createManager(){
        inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the Project Manager?',
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the Project Manager\'s ID?'
        },
        {
            name: 'email',
            type: 'input',
            message: 'What is their email address?',
            validate: answer => {
                const approved = answer.match(/\S+@\S+\.\S+/);
                if(approved){
                    return true
                } else {
                    return "Please enter a valid email, jerk."
                }
            }
        },
        {
            name: 'officeNumber',
            type: 'input',
            message: 'What is your office number?'
        },

    ]).then( answers =>{
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        teamMembers.push(manager);
        buildTeam();
    })

    }

    function createEngineer(){
        inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of this Engineer?',
            },
            {
                name: 'id',
                type: 'input',
                message: 'What is the Engineer\'s ID?'
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is their email address?',
                validate: answer => {
                    const approved = answer.match(/\S+@\S+\.\S+/);
                    if(approved){
                        return true
                    } else {
                        return "Please enter a valid email, jerk."
                    }
                }
            },
            {
                name: 'github',
                type: 'input',
                message: 'What is their github profile?'
            },
    
        ]).then( answers =>{
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            teamMembers.push(engineer);
            buildTeam();
        })
    
    }

    function createIntern(){
        inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of this intern?',
            },
            {
                name: 'id',
                type: 'input',
                message: 'What is the intern\'s ID?'
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is their email address?',
                validate: answer => {
                    const approved = answer.match(/\S+@\S+\.\S+/);
                    if(approved){
                        return true
                    } else {
                        return "Please enter a valid email, jerk."
                    }
                }
            },
            {
                name: 'school',
                type: 'input',
                message: 'What is their school?'
            },
    
        ]).then( answers =>{
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            teamMembers.push(intern);
            buildTeam();
        })
    }

     function buildTeam(){
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What role is this team member?', 
                choices: ["Engineer", "Intern", "none. I\'m good, thanks buddy."],
            }
        ]).then( choices => {
            switch(choices.role) {
            case "Engineer":
                createEngineer()
                break;

            case "Intern":
                createIntern()
                break;

            default:
                renderTeam();

            }
        })
    }

    function renderTeam(){
        fs.writeFile(outputPath, render(teamMembers), err => {
            if (err) {
                console.log(err);
            } else {
                console.log("well done jabrone")
            }
        })
    }

    createManager()
}

firstQuestions()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
