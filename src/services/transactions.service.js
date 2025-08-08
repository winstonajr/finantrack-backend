import { transactionRepository } from '../repositories/transactions.repository.js'

const createTransaction = (transactionData) => {
  return transactionRepository.create(transactionData)
}

const getUserTransactions = (userId) => {
  return transactionRepository.findAllByUserId(userId)
}

const getUserSummary = async (userId) => {
  const summaryData = await transactionRepository.getSummaryByUserId(userId)

  const summary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  }

  for (const group of summaryData) {
    if (group.type === 'income') {
      summary.totalIncome = group._sum.amount || 0
    } else if (group.type === 'expense') {
      summary.totalExpense = group._sum.amount || 0
    }
  }

  summary.balance = summary.totalIncome - summary.totalExpense

  return summary
}

// ▼▼▼ NOSSA NOVA FUNÇÃO ▼▼▼
const deleteTransaction = async (transactionId, userId) => {
  // 1. Busca a transação no banco
  const transaction = await transactionRepository.findById(transactionId)

  // 2. Se a transação não existe, lança um erro
  if (!transaction) {
    throw new Error('Transação não encontrada.')
  }

  // 3. Se a transação não pertence ao usuário logado, lança um erro
  if (transaction.userId !== userId) {
    throw new Error('Acesso negado. Você não pode apagar esta transação.')
  }

  // 4. Se tudo estiver certo, apaga a transação
  await transactionRepository.deleteById(transactionId)
}

const updateTransaction = async (transactionId, updateData, userId) => {
  const transaction = await transactionRepository.findById(transactionId)

  if (!transaction) {
    throw new Error('Transação não encontrada.')
  }

  if (transaction.userId !== userId) {
    throw new Error('Acesso negado. Você não pode editar esta transação.')
  }

  return transactionRepository.updateById(transactionId, updateData)
}

export const transactionService = {
  createTransaction,
  getUserTransactions,
  getUserSummary,
  deleteTransaction,
  updateTransaction,
}