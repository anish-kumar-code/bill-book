// models/Product.js
const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number },
  discountedPrice: { type: Number },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  fabric: { type: mongoose.Schema.Types.ObjectId, ref: 'Fabric', required: true },
  primary_image: { type: String, required: true },
  gallery_image: [{ type: String, required: true }],
  variants: [variantSchema],
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  returnAvailable: { type: Boolean, default: false },
  exchangeAvailable: { type: Boolean, default: false },
  isStock: {type: Boolean, default: true},
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }
}, { timestamps: true });

module.exports = mongoose.model('ProductModel', productSchema);
