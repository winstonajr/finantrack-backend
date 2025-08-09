import { Router } from 'express'
import { transactionController } from '../../controllers/transactions.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', transactionController.create)
router.get('/', transactionController.findAllByUser)
router.get('/summary', transactionController.getSummary)
router.delete('/:id', transactionController.remove)
router.post('/:id', transactionController.update)

export default router