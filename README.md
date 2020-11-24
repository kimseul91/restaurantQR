# restaurantQR

restaurantQR code

Our final project will be a web application (hosted on Firebase) that supports local restaurants after COVID-19 by allowing customers an easier way of requesting services while dining in and an easy to use management system for the employees. Dining in customers will be able to scan the QR code which will be placed on each table that will link to the web app to request real-time service. The website will have simple to use UI/UX to accommodate every customer’s technical experience. Our website will use a QR code 3rd party api (http://goqr.me/api/) to generate links for each table to use. Additionally, we may use the Google Translate API to allow for the translation of menu items.

Each restaurant will sign up through our website, then be able to modify the landing page. We will use Firebase’s Firestore NoSQL database to store individual restaurant info, such as employees and menu items. On the restaurant’s home page, the manager will be able to edit the menu, waiters/waitresses (add/remove), and what customers can request like food, drinks, napkins, refills, check, etc. Each employee will also sign up and they will be able to choose which tables to manage for that shift. When customers request a service, the correlated employee will be notified with the table number.
The Customers’ view of the website will have buttons to request drinks/napkins/refills, order food, and request for the check as well as their assigned waiter/waitress name. The customers can also navigate to see the restaurant’s menu with pictures and the price. They will have the option to translate the menu in different languages via Google translate API. Customers will be able to search the menu using the input box (with autocomplete).

## Customer API

### Ordering

	Purpose: 
		Adds an item to your order
	Endpoint: 
		PUT https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/customer/table/:id/order
	URL params wildcards:
		restaurantName: name of the restaurant from where you're ordering
		id: table number
	Post Body:
		request: the name of the ordered item
		time: the current time
	Response: 
		Responds with a status 200 if order is successfully placed

### Retrieving a Menu

	Purpose: 
		Retrieves the menu for the given restaurant
	Endpoint: 
		GET https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/menu
	URL params wildcards:
		restaurant: name of the restaurant from where you're ordering
	Response: 
		Responds with the full document of data from a given restaurant

### Getting a Restaurant Name

	Purpose: 
		Sends back the name of the restaurant that is linked to your account
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName
	Post Body:
		user: the current Firebase user object
	Response: 
		Responds with the name of the restaurant linked to the account
		
### Translating a Single Item
	Purpose: 
		Translates only the name of a single menu item into a given language
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/translate/item
	Post Body:
		item: the name of the menu item
		language: the language code for the desired translation
	Response: 
		Responds with the translation of the item's name
### Translating an Entire Menu
	Purpose: 
		Translates a restaurant's entire menu into a given language
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/translate/fullMenu
	Post Body:
		menu: a json object with nested fields representing a menu
			Example: {
			"Appetizers": {
					"Quesadillas": {
						"description": "Cheese Quesadillas",
						"price": 1.99
					}
				}
			}
		language: the language code for the desired translation
		name: the name of the restaurant
	Response: 
		Responds with an object that represents the translated menu

## Restaurant Manager/Staff API

### Detail about restaurant
	Purpose:
		Gets details about of the restaurant
	Endpoint:
           	GET  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/liverequest
           	Note: Replace ":restaurant" in the above route with the restaurant name to retrieve
   	Request Params:
           	This route does not accept request params, but the name of the restaurant
           	that should be retrieved must be specified in the URL.
   	Response:
           	This route responds with details about the restaurant field data in
           	JSON format.
### Receive
  	Purpose:
           	Gets details about all of the employees
   	Endpoint:
           	GET  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/employees
           	Note: Replace ":restaurant" in the above route with the restaurant name to retrieve
   	Request Params:
           	This route does not accept request params, but the name of the employees
           	that should be retrieved must be specified in the URL.
   	Response:
           	This route responds with details about the employees field data in
           	JSON format.

### Delete requests
   	Purpose:
           	Permanently deletes a specific request
   	Endpoint:
           	PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/deleterequest/:table
           	Note: Replace ":restaurant" in the above route with the restaurant name to delete request
           	Note: Replace ":table" in the above route with the table number to deleete request
   	Request Params:
           	body (Object) - Required. The new list of requested list
   	Response:
           	Upon successful request, the route responds with 200 status code
 ### Delete employee
   	Purpose:
           	Permanently deletes a specific employee
   	Endpoint:
          	PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/remove/:eid
           	Note: Replace ":restaurant" in the above route with the restaurant name to delete 
           	Note: Replace ":eid" in the above route with the employee id to deleete 
   	Request Params:
           	body (Object) - Required. The whole list of employees list
   	Response:
           	Upon successful request, the route responds with 200 status code
		
 ### Delete table
   	Purpose:
           	Permanently deletes a specific table
   	Endpoint:
           	PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/deletetable
           	Note: Replace ":restaurant" in the above route with the restaurant name to delete 
   	Request Params:
           	body (Object) - Required. The new list of table list
   	Response:
           	Upon successful request, the route responds with 200 status code
 
 ### Create new table
   	Purpose:
           	Create a new table in the database
   	Endpoint:
           	PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/edit/table/:id/
         	Note: Replace ":restaurant" in the above route with the restaurant name to add 
           	Note: Replace ":id" in the above route with the table id to add 
   	Request Params:
           	body (Object) - Required. The new list of added table list
   	Response:
           	Upon successful request, the route responds with 200 status code
 
 ### Create an employee
   	Purpose:
           	Create a new employee in the database
   	Endpoint:
           	PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/edit/addemployee
           	Note: Replace ":restaurant" in the above route with the restaurant name to add 
   	Request Params:
           	body (Object) - Required. The new list of added employee list
   	Response:
           	Upon successful request, the route responds with 200 status code
 
 ### Employee clock in / out
   	Purpose:
           	Updates employee's data as clock in/out
   	Endpoint:
           	PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api//:restaurant/staff/:clockinout/:eid
           	Note: Replace ":restaurant" in the above route with the restaurant name to update
           	Note: Replace ":clockinout" in the above route with the approporiate request (in or out) 
           	Note: Replace ":eid" in the above route with the employee's eid to update 
   	Request Params:
           	body (Object) - Required. The new list of updated employee list
   	Response:
           	Upon successful request, the route responds with 200 status code
  
 ### Creating an account
	Purpose: 
		Adds your account to the database
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/createAccount
	Post Body:
		uid: user id
		name: the name of the restaurant
		address: the address of the restaurant
	Response: 
		Responds with a status 201

### Adding a Menu Section
	Purpose: 
		Adds a new menu section to the restaurant's menu
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/addNew/section
	Post Body:
		name: the name of the restaurant
		sectionName: the name of the new menu section
	Response: 
		Responds with a status 200
		
### Adding a Menu Item

	Purpose: 
		Add a new menu item to a section to the restaurant's menu
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/addNew/item
	Post Body:
		name: the name of the restaurant
		sectionName: the name of the section that the item will go under
		itemName: the name of the item
		description (optional): the description of the item
		Price (optional): the price of the item
	Response: 
		Responds with a status 200
### Deleting a Menu Section

	Purpose: 
		Deletes a menu section and all menu items in it
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/delete/section
	Post Body:
		name: the name of the restaurant
		sectionName: the name of the section that the item will go under
	Response: 
		Responds with a status 200

### Deleting a Menu Item

	Purpose: 
		Deletes a menu item under a specific menu section
	Endpoint: 
		POST https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/delete/item
	Post Body:
		name: the name of the restaurant
		sectionName: the name of the section that the item will go under
		itemName: the name of the section that the item will go under
	Response: 
		Responds with a status 200

