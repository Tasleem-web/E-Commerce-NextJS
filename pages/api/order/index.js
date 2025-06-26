import connectDB from "../../../utils/connectDB";
import { HttpStatus } from "../constants";
import auth from '../../../middleware/auth';
import Order from "../../../models/orderModel";
import Product from "../../../models/productModel";


connectDB()

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createOrder(req, res);
      break;

    case 'GET':
      await getOrder(req, res);
      break;

    default:
      break;
  }
}

const createOrder = async (req, res) => {
  try {

    const result = await auth(req, res);

    const { address, mobile, cart, total } = req.body;

    const newOrder = new Order({
      user: result._id,
      address,
      mobile,
      cart,
      total
    });


    cart.filter(item => sold(item._id, item.quantity, item.inStock, item.sold));

    console.log(newOrder)
    await newOrder.save();

    return res.status(HttpStatus['Created']).json({
      message: 'Payment success! We will contact you to confirm the order.',
      result: newOrder
    })

  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ error: { message: error.message } });
  }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
  await Product.findOneAndUpdate({ _id: id }, {
    inStock: oldInStock - quantity, // 500 - 1 = 499
    sold: quantity + oldSold // 1 + 0 = 1
  });
}