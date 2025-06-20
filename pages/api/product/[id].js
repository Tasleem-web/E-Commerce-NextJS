import connectDB from '../../../utils/connectDB';
import Product from '../../../models/productModel';
import { HttpStatus, USER_SIGNIN, SUCCESS, ERROR } from "../constants";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;

    default:
      break;
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(HttpStatus['NotFound']).json({ message: "Product not found." });
    }

    return res.status(HttpStatus['OK']).json({
      status: "Products retrieved successfully!",
      product
    });

  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ message: error.message });
  }
};
