import { Router } from 'express'
import healthRouter from './health.routes.js'
import authRouter from './auth.routes.js'
import transactionsRouter from './transactions.routes.js'

const router = Router()

router.use(healthRouter)
router.use('/auth', authRouter)
router.use('/transactions', transactionsRouter)

export default router