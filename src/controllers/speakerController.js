// Dependências:
import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

// Adicionar um novo palestrante:
export const addSpeaker = (req, res) => {}

// Pesquisar por todos os palestrantes:
export const getAllSpeakers = (req, res) => {
  const searchSQL = /*sql*/ `SELECT * FROM palestrantes`

  conn.query(searchSQL, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        err: "Erro interno ao buscar os palestrantes. Tente novamente mais tarde."
      });
    }

    const speakers = data;
    res.status(200).json(speakers)
  })
}
