const validateNewAttendees = (req, res, next) => {
  const { nome, dt_nascimento, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({
      message: "O nome do participante é obrigatório."
    })
  }
  if (!dt_nascimento) {
    return res.status(400).json({
      message: "A data de nascimento do participante é obrigatória."
    })
  }
  if (!email) {
    return res.status(400).json({
      message: "O e-mail do participante é obrigatório."
    })
  }
  if (!senha) {
    return res.status(400).json({
      message: "A senha do participante é obrigatória."
    })
  }

  next()
}

export default validateNewAttendees;