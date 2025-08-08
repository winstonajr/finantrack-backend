import { authService } from '../services/auth.service.js'

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await authService.registerUser({ name, email, password })
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.loginUser({ email, password })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

export const authController = {
  register,
  login,
}