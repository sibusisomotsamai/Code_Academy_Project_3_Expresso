Capstone Project 3: Expresso
Expresso
Project Overview
In this capstone project, you will build all of the routing and database logic for an internal tool for a coffee shop called Expresso.
The Expresso internal tool should allow users to:
•	Create, view, update, and delete menus
•	Create, view, update, and delete menu items
•	Create, view, update, and delete employees
•	Create, view, update, and delete employee's timesheets
You can view all of this functionality in action in the video below:
https://s3.amazonaws.com/codecademy-content/programs/build-apis/solution-videos/Expresso480.mov

How To Begin
To start, download the starting code for this project here. After downloading the zip folder, double click it to uncompress it and access the contents of this project.
To view your local version of the site, open index.html in Google Chrome.
Implementation Details
To complete this project, you will need to create the database tables and API routes specified below.
To test this functionality you can run the testing suite and interact with the API via the provided front-end. If you want more data to interact with in the front-end, you can run the seed.js file to add data to your database.
We've provided an empty migration.js file for you to write table creation logic in.
In order for the tests and provided front-end to run properly, you will need to make sure to:
•	Create and export your Express app from a root-level file called server.js
•	Accept and set an optional port argument for your server to listen on from process.env.PORT
•	If process.env.PORT is not set, server should run on port 4000 (this is where the provided front-end will make requests to)
•	Accept and set an optional database file argument from process.env.TEST_DATABASE in all Express route files that open and modify your database
•	Use the root-level database.sqlite as your API's database
•	Note: When loading database.sqlite in your JavaScript files, sqlite3 will always try to load database.sqlitefrom the root directory path, ./database.sqlite, regardless of where the current file is located. Therefore your code will always be new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite') regardless of the file you are writing in
Database Table Properties
•	Employee
o	id - Integer, primary key, required
o	name - Text, required
o	position - Text, required
o	wage - Integer, required
o	is_current_employee - Integer, defaults to 1
•	Timesheet
o	id - Integer, primary key, required
o	hours - Integer, required
o	rate - Integer, required
o	date - Integer, required
o	employee_id - Integer, foreign key, required
•	Menu
o	id - Integer, primary key, required
o	title - Text, required
•	MenuItem
o	id - Integer, primary key, required
o	name - Text, required
o	description - Text, optional
o	inventory - Integer, required
o	price - Integer, required
o	menu_id - Integer, foreign key, required
Route Paths and Functionality
/api/employees
•	GET
o	Returns a 200 response containing all saved currently-employed employees (is_current_employee is equal to 1) on the employees property of the response body
•	POST
o	Creates a new employee with the information from the employee property of the request body and saves it to the database. Returns a 201 response with the newly-created employee on the employee property of the response body
o	If any required fields are missing, returns a 400 response
/api/employees/:employeeId
•	GET
o	Returns a 200 response containing the employee with the supplied employee ID on the employeeproperty of the response body
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
•	PUT
o	Updates the employee with the specified employee ID using the information from the employee property of the request body and saves it to the database. Returns a 200 response with the updated employee on the employee property of the response body
o	If any required fields are missing, returns a 400 response
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
•	DELETE
o	Updates the employee with the specified employee ID to be unemployed (is_current_employee equal to 0). Returns a 200 response.
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
/api/employees/:employeeId/timesheets
•	GET
o	Returns a 200 response containing all saved timesheets related to the employee with the supplied employee ID on the timesheets property of the response body
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
•	POST
o	Creates a new timesheet, related to the employee with the supplied employee ID, with the information from the timesheet property of the request body and saves it to the database. Returns a 201 response with the newly-created timesheet on the timesheet property of the response body
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
/api/employees/:employeeId/timesheets/:timesheetId
•	PUT
o	Updates the timesheet with the specified timesheet ID using the information from the timesheet property of the request body and saves it to the database. Returns a 200 response with the updated timesheet on the timesheet property of the response body
o	If any required fields are missing, returns a 400 response
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
o	If an timesheet with the supplied timesheet ID doesn't exist, returns a 404 response
•	DELETE
o	Deletes the timesheet with the supplied timesheet ID from the database. Returns a 204 response.
o	If an employee with the supplied employee ID doesn't exist, returns a 404 response
o	If an timesheet with the supplied timesheet ID doesn't exist, returns a 404 response
/api/menus
•	GET
o	Returns a 200 response containing all saved menus on the menus property of the response body
•	POST
o	Creates a new menu with the information from the menu property of the request body and saves it to the database. Returns a 201 response with the newly-created menu on the menu property of the response body
o	If any required fields are missing, returns a 400 response
/api/menus/:menuId
•	GET
o	Returns a 200 response containing the menu with the supplied menu ID on the menu property of the response body
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
•	PUT
o	Updates the menu with the specified menu ID using the information from the menu property of the request body and saves it to the database. Returns a 200 response with the updated menu on the menuproperty of the response body
o	If any required fields are missing, returns a 400 response
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
•	DELETE
o	Deletes the menu with the supplied menu ID from the database if that menu has no related menu items. Returns a 204 response.
o	If the menu with the supplied menu ID has related menu items, returns a 400 response.
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
/api/menus/:menuId/menu-items
•	GET
o	Returns a 200 response containing all saved menu items related to the menu with the supplied menu ID on the menuItems property of the response body
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
•	POST
o	Creates a new menu item, related to the menu with the supplied menu ID, with the information from the menuItem property of the request body and saves it to the database. Returns a 201 response with the newly-created menu item on the menuItem property of the response body
o	If any required fields are missing, returns a 400 response
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
/api/menus/:menuId/menu-items/:menuItemId
•	PUT
o	Updates the menu item with the specified menu item ID using the information from the menuItemproperty of the request body and saves it to the database. Returns a 200 response with the updated menu item on the menuItem property of the response body
o	If any required fields are missing, returns a 400 response
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
o	If a menu item with the supplied menu item ID doesn't exist, returns a 404 response
•	DELETE
o	Deletes the menu item with the supplied menu item ID from the database. Returns a 204 response.
o	If a menu with the supplied menu ID doesn't exist, returns a 404 response
o	If a menu item with the supplied menu item ID doesn't exist, returns a 404 response
Testing
A testing suite has been provided for you, checking for all essential functionality and edge cases.
To run these tests, first, open the root project directory in your terminal. Then run npm install to install all necessary testing dependencies (if you haven't already). Finally, run npm test. You will see a list of tests that ran with information about whether or not each test passed. After this list, you will see more specific output about why each failing test failed.
As you implement functionality, run the tests to ensure you are creating correctly named variables and functions that return the proper values. The tests will additionally help you identify edge cases that you may not have anticipated when first writing the functions
