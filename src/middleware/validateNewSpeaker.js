const validateNewSpeaker = (req, res, next) => {
  const { nome, expertise, dt_nascimento, cpf, email, senha } = req.body;

  if (!nome) {
    res.status(400).json({
      message: "O nome é obrigatório."
    })
  }
  if (!expertise) {
    res.status(400).json({
      message: "A especialização é obrigatória."
    })
  }
  if (!dt_nascimento) {
    res.status(400).json({
      message: "A data de nascimento é obrigatória."
    })
  }
  if (!cpf) {
    res.status(400).json({
      message: "O Cadastro de Pessoa Física (CPF) é obrigatório."
    })
  }
  if (!email) {
    res.status(400).json({
      message: "O e-mail é obrigatório."
    })
  }
  if (!senha) {
    res.status(400).json({
      message: "A senha é obrigatória."
    })
  }

  next()
}

export default validateNewSpeaker;