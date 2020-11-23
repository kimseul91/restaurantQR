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
		PUT `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/customer/table/:id/order`

	URL params wildcards:
		restaurantName: name of the restaurant from where you're ordering
		id: table number

	Response: 
		Responds with a status 200.

### Retrieving a Menu

	Purpose: 
		Retrieves the menu for the given restaurant

	Endpoint: 
		POST `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/menu`

	URL params wildcards:
		restaurant: name of the restaurant from where you're ordering
	Response: 
		Responds with the full document of data from a given restaurant

### Retrieving a Restaurant Name

	Purpose: 
		Retrieves the menu for the given restaurant

	Endpoint: 
		POST `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/menu`

	URL params wildcards:
		restaurant: name of the restaurant from where you're ordering

	Response: 
		Responds with the full document of data from a given restaurant

# Restaurant Manager/Staff API
