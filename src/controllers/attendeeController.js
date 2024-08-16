// Dependências / Conexões:
import bcrypt from "bcrypt"
import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

// Adicionar um novo participante:
export const addAttendee = (req, res) => {
  const { nome, dt_nascimento, email, senha } = req.body;

  const checkUniqueSQL = {
    s: /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`,
    v: ["email", email]
  }

  conn.query(checkUniqueSQL['s'], checkUniqueSQL['v'], async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        err: "Erro interno ao buscar os participantes.",
        tip: "Tente novamente mais tarde."
      });
    }

    if (data.length > 0) {
      return res.status(409).json({
        message: "O e-mail inserido já está em uso."
      })
    }

    // Tratamento de dados:
    const id = uuidv4();
    const salt = await bcrypt.genSalt(15)
    const senhaHash = await bcrypt.hash(senha, salt)

    const insertSQL = {
      s: /*sql*/ `INSERT INTO participantes (??) VALUES (?)`,
      v: [
        ["participante_id", "nome", "dt_nascimento", "email", "senha"],
        [id, nome, dt_nascimento, email, senhaHash]
      ]
    }

    conn.query(insertSQL['s'], insertSQL['v'], (_err, _data) => {
      if (_err) {
        console.error(_err);
        return res.status(500).json({
          err: "Erro interno ao adicionar o participante.",
          tip: "Tente novamente mais tarde."
        });
      }

      res.status(201).json({
        message: "Participante adicionado com sucesso!"
      })
    })
  })
}