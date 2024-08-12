import conn from "../config/conn.js";

const tbPalestrante = /*sql*/ `
  CREATE TABLE IF NOT EXISTS palestrantes (
    palestrante_id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    expertise VARCHAR(255) NOT NULL,
    dt_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

conn.query(tbPalestrante, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`[API] model: Tabela "palestrantes" criada com sucesso.`);
});
