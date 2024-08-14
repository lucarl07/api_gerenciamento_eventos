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
  if (typeof palestrantes_id !== Array) {
    return res.status(400).json({
      message: "O ID dos palestrantes participantes deve ser listado como array."
    })
  }

  next();
}

export default validateNewEvents;