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

// ▼▼▼ NOSSA NOVA FUNÇÃO ▼▼▼
const remove = async (req, res) => {
  try {
    const transactionId = req.params.id // Pega o ID da URL
    const userId = req.user.id // Pega o ID do usuário do token

    await transactionService.deleteTransaction(transactionId, userId)

    // O status 204 (No Content) é a resposta padrão para deleções bem-sucedidas
    return res.status(204).send() 
  } catch (error) {
    // Se o erro for 'não encontrada' ou 'acesso negado', retorne o status apropriado
    if (error.message.includes('não encontrada')) {
        return res.status(404).json({ message: error.message })
    }
    if (error.message.includes('Acesso negado')) {
        return res.status(403).json({ message: error.message }) // 403 Forbidden
    }
    return res.status(400).json({ message: error.message })
  }
}


const update = async (req, res) => {
    try {
        const transactionId = req.params.id
        const userId = req.user.id
        const updateData = req.body // O corpo da requisição terá os campos a serem mudados

        const updatedTransaction = await transactionService.updateTransaction(transactionId, updateData, userId)

        return res.status(200).json(updatedTransaction)
    } catch (error) {
        // Mesma lógica de tratamento de erros da deleção
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ message: error.message })
        }
        if (error.message.includes('Acesso negado')) {
            return res.status(403).json({ message: error.message })
        }
        return res.status(400).json({ message: error.message })
    }
}

export const transactionController = {
  create,
  findAllByUser,
  getSummary,
  remove,
  update,
}