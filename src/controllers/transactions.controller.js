import { transactionService } from '../services/transactions.service.js'

const create = async (req, res) => {
  try {
    const { description, amount, type, date } = req.body
    const userId = req.user.id 

    const transactionData = { description, amount, type, date, userId }
    const transaction = await transactionService.createTransaction(transactionData)

    return res.status(201).json(transaction)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const findAllByUser = async (req, res) => {
  try {
    const userId = req.user.id
    const transactions = await transactionService.getUserTransactions(userId)
    return res.status(200).json(transactions)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id
    const summary = await transactionService.getUserSummary(userId)
    return res.status(200).json(summary)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const transactionController = {
  create,
  findAllByUser,
  getSummary,
}