import express from 'express'
import { register, login, update, getById } from '../controllers/userController.js'
import { forgotPassword, resetPassword } from '../controllers/authController.js'
const router = express.Router()


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/update').post(update)
router.route('/getbyid').post(getById)

router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:token').patch(resetPassword)


export default router
