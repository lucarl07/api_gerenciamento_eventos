const validateNewSpeaker = (req, res, next) => {
  const { nome, expertise, dt_nascimento, cpf, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({
      message: "O nome é obrigatório."
    })
  }
  if (!expertise) {
    return res.status(400).json({
      message: "A especialização é obrigatória."
    })
  }
  if (!dt_nascimento) {
    return res.status(400).json({
      message: "A data de nascimento é obrigatória."
    })
  }
  if (!cpf) {
    return res.status(400).json({
      message: "O Cadastro de Pessoa Física (CPF) é obrigatório."
    })
  }
  if (!email) {
    return res.status(400).json({
      message: "O e-mail é obrigatório."
    })
  }
  if (!senha) {
    return res.status(400).json({
      message: "A senha é obrigatória."
    })
  }

  next()
}

export default validateNewSpeaker;