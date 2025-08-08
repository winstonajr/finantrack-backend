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

export const transactionService = {
  createTransaction,
  getUserTransactions,
  getUserSummary,
}