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

export const transactionRepository = {
  create,
  findAllByUserId,
  getSummaryByUserId,
}