# myRetailFinal

This app is both an express backend server accepting GET and PUT requests to obtain or update
product information.



## Hosting

The backend is currently hosted at:

https://stark-bastion-48445.herokuapp.com

where you can send GET requests using the following format and receive a JSON response:

https://stark-bastion-48445.herokuapp.com/api/products/13860428




You can currently find product information for these product numbers:

11361091, 11373620, 13860428, 13881744, 51872710, 51901741, 53141629, 53360962, 54311403, 76489362



You can also send a PUT request to update the price of the item
(using a service like Postman) using the following URL format:

https://stark-bastion-48445.herokuapp.com/api/products/13860428/19.99

The last paramater in the URL will be the new price of the item.


## What's happening on the backend:


When the app receives a GET request, it first sends a GET request to redsky.target.com in order
to obtain product information. Once complete, it calls a Google Firestore NoSQL database
(which is why there are only ten working ID numbers at the moment as I set up and seeded this database)
and receives pricing information for the product. The app than formats the relevant information into
a JSON and sends it back to the user. The PUT request works much the same way, but only updates
the Firestore database with the pricing information and doesn't call redsky.



## Frontend App Example


The code in this repository also includes a simple frontend app using React that demonstrates
how a client could make use of these HTTP requests. In order to see it in action, you'll have to
clone the repo and run an npm install or yarn install to download dependencies. Then move into
the client folder and run npm start or yarn start to run the React app on localhost:3000. This
should allow the you see the React app on your computer. You can search any for any of the ten
ID numbers, and once you have a result, click on the "Update Price" button to open a modal
and change the of the item.



### Technologies used include:

Node, Express, Axios, Google Cloud Firestore, React, Heroku, GitHub
