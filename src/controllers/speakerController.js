// Dependências / Conexões:
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid";
import conn from "../config/conn.js";

// Adicionar um novo palestrante:
export const addSpeaker = (req, res) => {
  const { nome, expertise, dt_nascimento, cpf, email, senha } = req.body;

  const checkUniquesSQL = {
    string: /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ? OR ?? = ?`,
    values: ["cpf", cpf, "email", email]
  }

  conn.query(checkUniquesSQL.string, checkUniquesSQL.values, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        err: "Erro interno ao buscar os palestrantes.",
        tip: "Tente novamente mais tarde."
      });
    }

    if (data.length > 0) {
      return res.status(409).json({
        message: "O e-mail e/ou CPF inserido já está em uso."
      })
    }

    // Tratamento de dados:
    const id = uuidv4();
    const salt = await bcrypt.genSalt(15)
    const senhaHash = await bcrypt.hash(senha, salt)

    const insertSQL = {
      string: /*sql*/ `INSERT INTO palestrantes (??) VALUES (?)`,
      values: [
        ["palestrante_id", "nome", "expertise", "dt_nascimento", "cpf", "email", "senha"],
        [id, nome, expertise, dt_nascimento, cpf, email, senhaHash]
      ]
    }

    conn.query(insertSQL.string, insertSQL.values, (_err, _data) => {
      if (_err) {
        console.error(_err);
        return res.status(500).json({
          err: "Erro interno ao adicionar palestrante.",
          tip: "Tente novamente mais tarde."
        });
      }

      res.status(201).json({
        message: "Palestrante adicionado com sucesso!"
      })
    })
  })
};

// Pesquisar por todos os palestrantes:
export const getAllSpeakers = (req, res) => {
  const searchSQL = /*sql*/ `SELECT * FROM palestrantes`;

  conn.query(searchSQL, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        err: "Erro interno ao buscar os palestrantes. Tente novamente mais tarde.",
      });
    }

    const speakers = data;
    res.status(200).json(speakers);
  });
};
