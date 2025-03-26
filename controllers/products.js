
import productModel from '../models/products.js'
import AppError from "../utils/appError.js"
import catchAsync from "../utils/catchAsync.js"


const create = catchAsync(async (req, res, next) => {

    const { user } = req.body
    const data = await productModel.create({ ...req.body, Owner: user })
    res.status(201).json({

        data
    })
})
const getAll = catchAsync(async (req, res, next) => {



    const { sortname, sortprice } = req.query
    if (sortname == 0) {

        const products = await productModel.find({}).sort({ price: sortprice })
        res.status(200).json({
            data: products,
        });
    }
    else {

        const products = await productModel.find({}).sort({ name: sortname })
        res.status(200).json({
            data: products,
        });
    }



});


const deleteProduct = catchAsync(async (req, res, next) => {

    await productModel.findByIdAndDelete(req.body.id)
    res.json({
        "message": "item Deleted"
    })
})
const getById = catchAsync(async (req, res, next) => {

    const data = await productModel.findById(req.params._id)

    if (!data) {
        return next(new AppError('No product found with that ID', 404))
    }

    res.send({
        data
    })
})
const updateReviews = catchAsync(async (req, res, next) => {
    const { _id, reviews } = req.body
    const data = await productModel.findByIdAndUpdate(_id, { reviews })

    if (!data) {
        return next(new AppError('No product found with that ID', 404))
    }
    res.send({
        data
    })
})
const search = catchAsync(async (req, res, next) => {
    const { search } = req.body
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const data = await productModel.find({ $text: { $search: search } }).skip(startIndex)
        .limit(parseInt(limit));
    res.json({
        data,
        currentPage: parseInt(page),
        totalPages: Math.ceil(await productModel.countDocuments({}) / limit),
    })
})


export { create, deleteProduct, getAll, getById, updateReviews, search }