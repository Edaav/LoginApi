const sql = require('mssql');

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	options: {
		trustedconnection: true,
		enableArithAbort: true,
	},
	pool: {
		max: 500,
		min: 1,
	},
    
	port: +process.env.DB_PORT,
};

const createConnectionPool = async () => {
	try {
		const pool = await sql.connect(config);
		return pool.connected;
	} catch (error) {
		console.log(error);
	}
    
};

module.exports = { createConnectionPool };