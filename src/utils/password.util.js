import bcrypt from 'bcryptjs'

// Função para criar um hash da senha
// O "salt" é um fator de aleatoriedade adicionado ao hash para torná-lo mais seguro.
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

// Função para comparar a senha enviada com o hash salvo no banco.
// Usaremos esta função no login.
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
};