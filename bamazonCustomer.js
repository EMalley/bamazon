var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
})

function start() {
    inquirer
        .prompt({
            name: 'mainMenu',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Place an order.', 'Exit application']
        }).then(function (answer) {
            if (answer === 'Place an order') {
                console.log("you chose to place an oder")
            }
            else {
                connection.end();
            }
        })
}