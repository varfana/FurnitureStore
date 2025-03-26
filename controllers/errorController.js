import AppError from '../utils/appError.js'

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}
const handleValidationErrorDB = err => {
    const errors =Object.values(err.errors).map(el=>{
        return el.message
    })
    const message = `Invalid input data. ${errors.join(' ')}`
    return new AppError(message, 400)
}
const handleDuplicateFieldDB = err => {
    const value = []
    for (const key in err.keyValue) {

        value.push(key)
    }


    const message = `Duplicate field value ${value.join(' ')}.Please use another value!`
    return new AppError(message, 400)
}


const sendErrorProd = (err, res) => {

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,

        })
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong',

        })
    }

}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack

    })
}

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.staus = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }

        if (err.name === 'CastError') {

            error = handleCastErrorDB(error)

        }
        if (err.code === 11000) {

            error = handleDuplicateFieldDB(error)

        }
        if (err.name === 'ValidationError') {

            error = handleValidationErrorDB(error)

        }

        sendErrorProd(error, res)
    }

}

export default globalErrorHandler