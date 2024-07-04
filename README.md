<h1 align="center">
 MobStore
</h1>
<p align="center">
Ecommerce Website
</p>

## clone or download
```terminal
$ git https://github.com/Riteshkaul/QuadB-Assignment.git
$ yarn # or npm i
```

```terminal
$ cd frontend          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally
```



## File structure
#### `Frontend` - Holds the Front Part
- #### `public` - This holds all of our static files
- #### `src`
    - #### `CSS` - This folder holds CSS of all the components
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `slices` - = It holds the slices of the redux 
- #### `package.json` - Defines npm behaviors and packages for the client

  ## Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a  mongoDb url or portno .env to connect to MongoDB)

```terminal
// in the root level
$ cd backend
$ npm i
```
#### `backend` - Holds the server application
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `middleware` - Here are the jwt auth file and admin file
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios | bcryptjs: ^2.4.3
react: ^18.3.1 |cors: ^2.8.5,
@reduxjs/toolkit : ^2.2.6 | cors: ^2.8.1
 react-dom: ^18.3.1| dotenv: ^16.4.5
react-redux: ^9.1.2| express: ^4.19.2
react-router-dom: ^6.24.0| jsonwebtoken: ^9.0.2,
redux: ^5.0.1 | mongoose: ^8.4.4

Frontend website without Login

![projectss1](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/76d2683c-1032-41e9-9d97-056ba281050a)

User Login When User are not Admin

![Screenshot (363)](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/6f304d83-8047-43d7-ba62-318e25fc4515)

Product Detail

![Screenshot (364)](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/a73fa6b2-4d18-4a49-88d1-d31beaebdc55)

When User is Admin

![Screenshot (365)](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/47b0fd2f-6fe2-475e-b6ff-654df07b70f0)


Admin has delete or edit the product

![Screenshot (366)](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/ef735327-36c0-4437-98a3-87368b78fd32)

Admin has Add New Product

![Screenshot (367)](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/edd45d57-255f-433a-8208-bad20b25388b)

Cart of the user
![Screenshot (368)](https://github.com/Riteshkaul/QuadB-Assignment/assets/93066663/697e6bf9-8fac-4610-9614-e978815981d4)

