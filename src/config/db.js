import mysql from "mysql2/promise"; 

export const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  port: Number(process.env.DB_PORT) || 3306, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  waitForConnections: true, 
  connectionLimit: 10, 
});

export const query = async (sql, params) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

export const connect = async () => {
  try {
    await pool.getConnection(); 
    console.log("Ansluten till MySQL");
  } catch (err) {
    console.error("Kunde inte ansluta till MySQL:", err.message);
    process.exit(1); 
  }
};