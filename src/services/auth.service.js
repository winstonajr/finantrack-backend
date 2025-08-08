import { userRepository } from '../repositories/user.repository.js'
import { hashPassword, comparePassword } from '../utils/password.util.js'
import jwt from 'jsonwebtoken'

const registerUser = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email)
  if (existingUser) {
    throw new Error('Este e-mail já está cadastrado.')
  }

  const hashedPassword = await hashPassword(userData.password)

  const newUser = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  }

  const createdUser = await userRepository.create(newUser)
  delete createdUser.password
  return createdUser
}

const loginUser = async (loginData) => {
  const user = await userRepository.findByEmail(loginData.email)
  if (!user) {
    throw new Error('Credenciais inválidas.')
  }

  const isPasswordValid = await comparePassword(loginData.password, user.password)
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas.')
  }

  const payload = { id: user.id, email: user.email }
  const secret = process.env.JWT_SECRET
  const options = { expiresIn: '1d' } 

  const token = jwt.sign(payload, secret, options)

  delete user.password

  return { user, token }
}

export const authService = {
  registerUser,
  loginUser,
}