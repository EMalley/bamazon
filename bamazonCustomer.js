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
    console.log("\n connected as ID")
    start();
})

function start() {
    inquirer.prompt({
        name: 'mainMenu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Place an order', 'Exit application']
    }).then(function (answer) {
        if (answer.mainMenu === 'Place an order') {
            console.log("Please selected an item by its ID number");
            showInventory();
        }
        else {
            connection.end();
        }
    });
}

// functions for application.
// function that shows the customer all availble items in database
function showInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("ITEMS FOR SALE")
        var productArray = [];
        for (var i = 0; i < results.length; i++) {
            productArray.push(results[i].product_name)
        }
        console.log("\n" + productArray.splice("\n"))
    })
}