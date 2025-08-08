import prisma from '../config/prisma.js'

const create = (data) => {
  return prisma.transaction.create({
    data,
  })
}

const findAllByUserId = (userId) => {
  return prisma.transaction.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: 'desc',
    },
  })
}

const getSummaryByUserId = async (userId) => {
  const result = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      userId: userId,
    },
    _sum: {
      amount: true,
    },
  })
  return result
}

// ▼▼▼ NOSSAS NOVAS FUNÇÕES ▼▼▼
const findById = (id) => {
  return prisma.transaction.findUnique({
    where: { id: parseInt(id) }, // Garante que o ID seja um número
  })
}

const deleteById = (id) => {
  return prisma.transaction.delete({
    where: { id: parseInt(id) },
  })
}

const updateById = (id, data) => {
  return prisma.transaction.update({
    where: { id: parseInt(id) },
    data: data, // `data` será um objeto com os campos a serem atualizados
  })
}

export const transactionRepository = {
  create,
  findAllByUserId,
  getSummaryByUserId,
  findById,
  deleteById,
  updateById,
}