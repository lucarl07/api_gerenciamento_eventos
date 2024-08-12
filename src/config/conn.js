import mysql2 from 'mysql2';

const conn = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
})

conn.query("SELECT 1 + 1 AS solution", (err, result) => {
  if (err) {
    console.error(err)
    return;
  }

  if (result[0].solution == 2) {
    console.log("[API] config: Banco de dados conectado com sucesso.")
  } else {
    console.log("[API] config: Erro inesperado ao conectar no banco de dados.")
  }
})

export default conn;