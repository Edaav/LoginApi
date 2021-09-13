const sql = require("mssql");

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save = async () => {
    try {
      const pool = await sql.connect();
      const insertedUser = await pool
        .request()
        .input("name", sql.NVarChar, this.name)
        .input("email", sql.NVarChar, this.email)
        .input("password", sql.NVarChar, this.password).query(`
        INSERT INTO Users (name, email, password) 
        VALUES(@name,@email, @password)
        
        SELECT email FROM Users Where id = SCOPE_IDENTITY()
              
              `);
              return insertedUser.recordset[0];
    } catch (err) {
      console.log("Error in saving the user: ");
      console.log(err);
      throw err;
    }
  };
  static findByEmail = async (email) => {
    try {
        const pool = await sql.connect();
        const user = await pool
            .request()
            .input('email', sql.NVarChar, email).query(`SELECT *
                    FROM Users 
                    WHERE Users.email = @email`);

        return user.recordset[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
  };
  
};
