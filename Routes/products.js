import express from 'express'
import { create, deleteProduct, getAll, getById, updateReviews, search } from '../controllers/products.js'
const router = express.Router()

router.route('/').get(getAll)
router.route('/:_id').get(getById)
router.route('/create').post(create)
router.route('/reviews').post(updateReviews)
router.route('/search').post(search)
router.route('/delete').post(deleteProduct)

export default router
