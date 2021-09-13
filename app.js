const express = require ("express");
const path = require('path');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const db = require('./database');
const User = require('./models/user');



const dotenv = require('dotenv');
const assert = require('assert');


const app = express();
app.use(cors());
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//PARSE URL ENCODED BODIES (AS SENT BY HTML FORMS)
app.use(express.urlencoded({extended:false}));
//PARSE JSON BODIES (AS SENT BY API CLIENTS)
app.use(express.json());

app.set('view engine','hbs');

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// CATCH THE ERROR
app.use((error, req, res, next) => {
	const message = error.message;
	const data = error.data;
	res.json({ message: message, data: data, result: false });
});

const httpServer = http.createServer(app);


(async () => {
	const isConnected = await db.createConnectionPool();
	if (isConnected) {
		httpServer.listen(3000, () => {
			console.log('The server is running successfully!');
		});

		// httpsServer.listen(5000, () => {
		// 	console.log("The server is running successfully!");
		// });
	} else {
		console.log('Database connection error...');
	}
})();

module.exports= app;