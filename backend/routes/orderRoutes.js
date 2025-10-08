const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.status !== 'available') {
        return res.status(400).json({ message: `Product ${product.title} is not available` });
      }

      totalAmount += product.price * item.quantity;
      orderProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price
      });

      product.status = 'pending';
      await product.save();
    }

    const order = new Order({
      buyer: req.user.id,
      seller: products[0].sellerId, 
      products: orderProducts,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-sales', auth, async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id })
      .populate('products.product')
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product')
      .populate('buyer', 'name email')
      .populate('seller', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.buyer._id.toString() !== req.user.id && 
        order.seller._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.orderStatus = orderStatus;
    
    if (orderStatus === 'delivered') {
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.status = 'sold';
          await product.save();
        }
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 