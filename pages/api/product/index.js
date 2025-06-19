import connectDB from '../../../utils/connectDB';
import Product from '../../../models/productModel';
import { HttpStatus, USER_SIGNIN, SUCCESS, ERROR } from "../constants";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;

    default:
      break;
  }
}

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.status(HttpStatus['OK']).json({
      status: "Products retrieved successfully!",
      result: products.length,
      products
    });

  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, images } = req.body;

    if (!name || !price || !description || !images) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      images
    });

    await newProduct.save();
    return res.status(201).json({ message: "Product created successfully!", product: newProduct });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};