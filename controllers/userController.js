import User from '../models/user.js'
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import Email from '../utils/email.js'
const register = catchAsync(async (req, res, next) => {

    const user = await User.create(req.body)
    const token = user.createJWT()
    const url = `${req.protocol}://3000/`
    await new Email(user, url).sendWelcome()
    res.send({
        "message": "registered successfully",
        user,
        token
    })
})
const login = catchAsync(async (req, res, next) => {


    const user = await User.findOne({ email: req.body.email }).select('+password')

    if (!user) {
        return next(new AppError('No user found with that email', 404))
    }
    if (! await user.comparePassword(req.body.password)) {
        return next(new AppError('No user found with that credentails', 401))
    }


    const token = user.createJWT()

    res.json({

        user,
        token
    })



})
const update = catchAsync(async (req, res, next) => {

    const { _id, products } = req.body

    const user = await User.findOneAndUpdate(_id, { products })
    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }
    res.json({

        user,

    })



})
const getById = catchAsync(async (req, res, next) => {


    const { _id } = req.body

    const user = await User.findOne({ _id })

    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }
    res.json({

        user,

    })


})



export { register, login, update, getById }