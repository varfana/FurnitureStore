import User from "../models/user.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from '../utils/appError.js'
import sendEmail from "../utils/email.js"
import crypto from 'crypto'
const forgotPassword = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('there is no user with email address', 404))
    }
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`


    const message = `Dear ${user.name},

We hope this email finds you well. We are writing to inform you that we have received a request to reset your password for The Furniture Shop. As part of our security measures, we require all password reset requests to be verified before any changes can be made.

To reset your password, please follow the link below and enter the verification code provided. Once your request has been verified, you will be prompted to create a new password.

${resetURL}

If you did not request this password reset or believe this request to be fraudulent, please contact us immediately at [insert contact information] so we can investigate further.

Thank you for your attention to this matter.

Best regards,

The Furniture Shop`
    try {
        await sendEmail({
            email: user.email,
            subject: 'your password reset token (valid for 10 min)',
            message
        })

    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(new AppError('There was an error sending the email .try again later !'))

    }



    res.status(200).json({
        status: 'success',
        message: 'Token sent to email'
    })

})
const resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })

    if (!user) {
        return next(new AppError('Token is invalid or has expired'))
    }
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    const token = user.createJWT()

    res.send({
        "message": "registered successfully",
        user,
        token
    })
}
)

export { forgotPassword, resetPassword }