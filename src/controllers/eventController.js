import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

// Adicionar um novo evento
export const addEvent = (req, res) => {
  const { titulo, data: dataEvento, horario, palestrantes_id } = req.body;

  let queryCondition = ""

  palestrantes_id.forEach((el, i) => {
    if (i === 0) {
      queryCondition += /*sql*/ `WHERE palestrante_id = "${el}" `
    }

    queryCondition += /*sql*/ `OR palestrante_id = "${el}" `
  })

  const getSpeakersSQL = /*sql*/ `SELECT * FROM palestrantes ${queryCondition}`

  conn.query(getSpeakersSQL, (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        err: "Erro interno ao pesquisar os palestrantes do evento.",
        tip: "Tente novamente mais tarde."
      })
    }

    if (data.length > 0) {
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
  
            res.status(201).json({
              message: "Evento adicionado com sucesso!"
            })
          })
        })
      })
    }
  })
}

// Pesquisar por todos os eventos (com detalhes dos palestrantes):
export const getAllEvents = (req, res) => {
  const selectSQL = {
    s: /*sql*/ `SELECT ?? FROM eventos`,
    v: [["evento_id", "titulo", "data", "horario"]]
  }

  conn.query(selectSQL['s'], selectSQL['v'], (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        err: "Erro interno ao buscar os eventos.",
        tip: "Tente novamente mais tarde."
      })
    }

    const eventList = data
    
    const parsedEventList = eventList.map((event) => {
      const getSpeakersSQL = {
        s: /*sql*/ `
          SELECT PA.palestrante_id, PA.nome, PA.expertise
          FROM eventos AS E
          LEFT JOIN 
            presenca_palestrantes AS PP
            ON E.evento_id = PP.evento_id
          LEFT JOIN
            palestrantes AS PA
            ON PP.palestrante_id = PA.palestrante_id
          WHERE ?? = ?
        `,
        v: ["E.evento_id", event.evento_id]
      }

      conn.promise().query(getSpeakersSQL['s'], getSpeakersSQL['v'], (_err, _data) => {
        if (_err) {
          console.log(_err)
          return res.status(500).json({
            err: "Erro interno ao buscar os eventos.",
            tip: "Tente novamente mais tarde."
          })
        } 

        return _data
      })
    })

    res.status(200).json(parsedEventList)
  })
}
