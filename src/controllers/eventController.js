import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const addEvent = (req, res) => {
  const { titulo, data: dataEvento, horario, palestrantes_id } = req.body;

  const eventoId = uuidv4();

  const insertEventSQL = {
    s: /*sql*/ `INSERT INTO eventos (??) VALUES (?)`, 
    v: [
      ["evento_id", "titulo", "data", "horario"], 
      [eventoId, titulo, dataEvento, horario]
    ]
  }

  conn.query(insertEventSQL['s'], insertEventSQL['v'], (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        err: "Erro interno ao adicionar evento.",
        tip: "Tente novamente mais tarde."
      });
    }

    palestrantes_id.forEach((palestranteId) => {
      const presencaId = uuidv4();

      const insertSpeakersSQL = {
        s: /*sql*/ `INSERT INTO presenca_palestrantes (??) VALUES (?)`,
        v: [
          ["presenca_id", "evento_id", "palestrante_id"], 
          [presencaId, eventoId, palestranteId]
        ]
      }

      conn.query(insertSpeakersSQL['s'], insertSpeakersSQL['v'], (_err, _data) => {
        if (_err) {
          console.error(_err)
          return res.status(500).json({
            err: "Erro interno ao atribuir os palestrantes do evento.",
            tip: "Tente novamente mais tarde."
          })
        }

        res.status(200).json({
          message: "Evento adicionado com sucesso!"
        })
      })
    })
  })
}

export const getAllEvents = (req, res) => {}