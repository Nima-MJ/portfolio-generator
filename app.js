const inquirer = require("inquirer");
// const fs = require("fs");
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, guthub);


// fs.writeFile("./index.html", pageHTML, err =>{
//     if(err) throw new Error(err);

//     console.log("Portfolio complete! Check out index.html to see the output!")

// })

const promptUser = () =>{
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message:"What is your name?",
            validate: userInput => {
                if (userInput){
                    return true;
                }else{
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"github",
            message: "Enter your Github Username",
            validate: userInput => {
                if(userInput){
                    return true;
                }else{
                    console.log("Please enter a valid github name!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: `Would you like to enter some information about yourself for an "About" section? `,
            default: true
        },
        {
            type: "input",
            name:"about",
            message:"Provide some information about yourself:",
            when: ({ confirmAbout }) => { //when gets an object of all the answers provided by the user so far and we are validating only the confirmAbout variable
                if(confirmAbout){     // if ture run this object else skip it
                    return true;
                }else{
                    return false;
                }

            }
        }
    ]);
};

const promptProject = portfolioData => {
    if (!portfolioData.projects){
        portfolioData.projects = [];
    }
    console.log(`
    =========================
    Add a New Project
    =========================
    `);
    return inquirer.prompt([
        {
            type:"input",
            name:"name",
            message: "What is the name of your project?",
            validate: userInput => {  //the arguement for validate(userInput) comes from the user input, it gets passed down to it automatically
                if(userInput){
                    return true;
                }else{
                    console.log("Please enter a valid project name!");
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"description",
            message:"Provide a description of the project (Required)",
            validate: userInput => {
                if(userInput){
                    return true;
                }else{
                    console.log("Please enter a valid project discription!");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: userInput => {
                if(userInput){
                    return true;
                }else{
                    console.log("Please enter a valid github link!");
                    return false;
                }
            }
        },
        {
            type:"confirm",
            name:"feature",
            message:"Would you like to feature this project?",
            default: false
        },
        {
            type:"confirm",
            name:"confirmAddProject",
            message:"Would you like to enter another project?",
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        }else{
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject) //the data object from promptUser gets passed to promptProject as an input
    .then(portfolioData => {
        console.log(portfolioData);
    });
