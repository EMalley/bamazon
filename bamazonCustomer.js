var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to the Main Menu of Bamazon! Please select one of the following")
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
            console.log("Please select an item");
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
        console.table(results);
        selectItem();
    })
}

// Select Item Function
// * ask the user what they would like to buy-working
// * then prompt how many units they would like to purchase
function selectItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_selector",
            message: "Please enter the ID number of the item you wish to purchase: "
        },
        {
            type: "input",
            name: "item_amount",
            message: "How many? "
        }
    ])
        .then(function (answer) {
            const queryDB = "SELECT * FROM products WHERE item_id = ?"
            const item = answer.item_selector;
            const amount = parseInt(answer.item_amount);

            connection.query(queryDB, item, function (err, results) {
                if (err) throw err;
                // console.log(results)
                const DBAmount = parseInt(results[0].stock_quantity);
                // console.log(results.stock_quantity)
                // console.log(DBAmount)

                if (!results.length) {
                    console.log("Sorry we dont have that item. Please try again");
                    selectItem();
                }
                else if (amount > DBAmount) {
                    console.log("Sorry we dont have that many, try again");
                    selectItem();
                }
                else {
                    const newDBAmount = parseInt(DBAmount) - amount;
                    var productName = (results[0].product_name)
                    console.log(newDBAmount)
                    console.log("this is the new data amount ", newDBAmount)
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newDBAmount, results[0].item_id], function (err, results) {
                        if (err) throw err;
                        else {
                            console.log(`Thank you for buying ${amount} of ${productName}. Come back again soon!`);
                            
                            connection.end();
                        }
                    });
                }
            }
            )
        })
}
