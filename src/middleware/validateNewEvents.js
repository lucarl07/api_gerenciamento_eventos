import conn from "../config/conn.js";

const validateNewEvents = (req, res, next) => {
  const { titulo, data, horario, palestrantes_id } = req.body;

  if (!titulo) {
    return res.status(400).json({
      message: "O título do evento é obrigatório."
    })
  }
  if (!data) {
    return res.status(400).json({
      message: "A data do evento é obrigatória."
    })
  }
  if (!horario) {
    return res.status(400).json({
      message: "O horário do evento é obrigatório."
    })
  }
  if (!palestrantes_id) {
    return res.status(400).json({
      message: "O ID dos palestrantes participantes é obrigatório."
    })
  }

  let doesAllSpeakersExist = true;

  palestrantes_id.forEach(pId => {
    const getSpeakersSQL = {
      s: /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`,
      v: ["palestrante_id", pId]
    }
    
    conn.query(getSpeakersSQL['s'], getSpeakersSQL['v'], (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          err: "Erro interno ao localizar palestrantes.",
          tip: "Tente novamente mais tarde."
        })
      }

      if (data.length === 0) {
        doesAllSpeakersExist = false
        res.status(409).json({
          err: `O palestrante "${pId}" não foi encontrado.`
        })
      }
    })
  });

  if (!doesAllSpeakersExist) {
    throw new Error("Nem todos os palestrantes existem.");
  }

  next();
}

export default validateNewEvents;