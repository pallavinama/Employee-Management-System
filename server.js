const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var actions = ["View Employees","View Roles","View Departments","Add Employe","Add Role","Add Department","Quit"];

// array of question objects
var mainPrompt = [
  {
    "type": "list",
    "name": "action",        
    "message": "What would you like to do?",
    "choices": actions
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
    //console.log("connected as id " + connection.threadId + "\n");
});

function viewDepartments(){
    connection.query('SELECT id,name FROM department', function (error, result, fields) {
        if (error) {
          throw error;
        }else{
            console.table(result);
            mainMenu();
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
        if (departmentName.length == 0){
            console.log("department name cannot be blank");
            addDepartment();
            return;
        }
        connection.query('INSERT INTO department SET name=?', departmentName, function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }else
                viewDepartments();
        });
    });
}

function viewRoles(){
    var query = 'SELECT r.id,r.title,r.salary,d.name as "department" FROM role r, department d '+
                 'where r.department_id = d.id order by r.id';
    connection.query(query, function (error, result, fields) {
        if (error) {
          throw error;
        }else{
            console.table(result);
            mainMenu();
        }
    });    
}

function addRole(){
    var roleQuestions = [
        {
            "type":"input",
            "name":"title",
            "message":"Enter Title"
        },
        {
            "type":"input",
            "name":"salary",
            "message":"Enter Salary"
        },
        {
            "type":"input",
            "name":"departmentName",
            "message":"Enter Department Name"
        }
    ];

    inquirer.prompt(roleQuestions).then(response => {
        var title = response.title;
        var salary = response.salary;
        var departmentName = response.departmentName;
        let departmentId = 0;

        // select department id
        connection.query("SELECT id FROM department WHERE name = '"+departmentName+"'", function (error, result, fields) {
            if (error) {
              throw error;
            }else{
                departmentId = result[0].id;
                var insertStatement = "INSERT INTO role (title,salary,department_id) values('"+title+"',"+salary+","+departmentId+")";
                connection.query(insertStatement, function (error, result) {
                    if (error) {
                      return connection.rollback(function() {
                        throw error;
                      });
                    }else
                        viewRoles();
                });        
            }
        });        
    });
}

function viewEmployees(){
    var query = 'SELECT e.id,e.first_name,e.last_name,r.title,r.salary,d.name as "department" FROM employee e, role r, department d '+
                 'where e.role_id = r.id and r.department_id = d.id order by e.id';
    connection.query(query, function (error, result, fields) {
        if (error) {
          throw error;
        }else{
            console.table(result);
            mainMenu();
        }
    });    
}

function addEmployee(){
    var employeeQuestions = [
        {
            "type":"input",
            "name":"firstName",
            "message":"Enter First Name"
        },
        {
            "type":"input",
            "name":"lastName",
            "message":"Enter Last Name"
        },
        {
            "type":"input",
            "name":"title",
            "message":"Enter Title"
        }
    ];

    inquirer.prompt(employeeQuestions).then(response => {
        var firstName = response.firstName;
        var lastName = response.lastName;
        var title = response.title;
        let roleId = 0;

        // select role id
        connection.query("SELECT id FROM role WHERE title = '"+title+"'", function (error, result, fields) {
            if (error) {
              throw error;
            }else{
                roleId = result[0].id;
                var insertStatement = "INSERT INTO employee (first_name,last_name,role_id) "+ 
                                      "values('"+firstName+"','"+lastName+"',"+roleId+")";
                connection.query(insertStatement, function (error, result) {
                    if (error) {
                      return connection.rollback(function() {
                        throw error;
                      });
                    }else
                        viewEmployees();
                });        
            }
        });        
    });
}

function mainMenu() { 
    console.log("Welcome to the Employee Management System!\n");
    inquirer.prompt(mainPrompt).then(answers => {
        var action = answers.action;
        if (action == actions[0]){
            viewEmployees();
        } else if (action == actions[1]){
            viewRoles();
        } else if (action == actions[2]){
            viewDepartments();
        } else if (action == actions[3]){
            addEmployee();
        } else if (action == actions[4]){
            addRole();
        } else if (action == actions[5]){
            addDepartment();
        } else if (action == actions[6]){
            connection.end();
        }
    });
}

mainMenu();