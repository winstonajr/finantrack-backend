import prisma from '../config/prisma.js'

const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

const create = async (userData) => {
  return await prisma.user.create({
    data: userData,
  })
}

export const userRepository = {
  findByEmail,
  create,
}