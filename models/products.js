import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        unique: true
        
    },
    category: {
        type: String,
        
    },
    shipping: {
        type: String,
        
    },
    offers: [{
        offerName: {
            type: String,
            
        },
        discount: {
            type: String,
            
        }
    }],
    used: {
        type: String,
        default:false
    },
    woodType: [{
        type: String,
        
    }],
    refundable: {
        type: String,
        default: true
        
    },
    averageRating:{
        type:Number
    },
    reviews: [{
        username: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            unique: true
        }
    }],
    Owner:{
        type:Object
    },
    termiteResistant:{
        type:String,
    },
    specifications:{
        type:Object
    }

        
    

},{timestamps:true});
productSchema.index({ '$**': 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
