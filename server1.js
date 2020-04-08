const inquirer = require("inquirer");
const mysql = require("mysql");
//const cTable = require("console.table");

var actions = ['View Employees','View Roles','View Departments','Add Employe','Add Role','Add Department'];

// array of question objects
var mainPrompt = [
  {
    "type": "list",
    "name": "action",        
    "message": "What would you like to do?",
    "choices": actions
  },
  {
    "type": "input",
    "name": "actionStep",
    "message": function(answers){
        var action = answers.action;
        if (action == actions[0]){
            return viewEmployees();
        } else if (action == actions[1]){
            return viewRoles();
        } else if (action == actions[2]){
            return viewDepartments();
        } else if (action == actions[3]){
            return addEmployee();
        } else if (action == actions[4]){
            return addRole();
        } else if (action == actions[5]){
            return addDepartment();
        }
    }
  }
];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // username
  user: "root",
  // password
  password: "Myvsgspwd787",
  database: "ems_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function viewDepartments(){
    //console.table(['name', 'age'], values);
    connection.query('SELECT id,name FROM DEPARTMENT', function (error, rows) {
        if (error) {
          throw error;
        }else{
            console.table(['id', 'name'], [[1,'one'],[2,'two']]);
        }
    });    
}

function addDepartment(){
    var deptQuestions = [
        {
            "type":"input",
            "name":"departmentName",
            "message":"Enter Department Name"
        }
    ];

    inquirer.prompt(deptQuestions).then(response => {
        var departmentName = response.departmentName;
        connection.query('INSERT INTO department SET name=?', departmentName, function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }else
                viewDepartments();
                //mainMenu();
        });
    });
}

function mainMenu() { 
    console.log("Welcome to the Employee Management System!\n");
    inquirer.prompt(mainPrompt).then(response => {
       mainMenu();
    });
}

mainMenu();