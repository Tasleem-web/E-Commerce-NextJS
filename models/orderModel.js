import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  address: String,
  mobile: String,
  cart: Array,
  total: Number,
  delivered: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Order = mongoose.model.Order || mongoose.model('order', orderSchema);

export default Order;