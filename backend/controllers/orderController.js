const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { Error } = require("mongoose");
//@get all orders
//@route GET /api/contacts
//@access private

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user_id: req.user.id });
    res.status(200).json(orders);
});

//@create new order
//@route POST /api/contacts
//@access private

const createOrder = asyncHandler(async (req, res) => {
    console.log("the request body is:", req.body);
    const { Product, Quantity } = req.body;
    if(!Product || !Quantity) {
        res.status(400);
        throw new  Error("All fields are mandatory !")
    }
    const order = await Order.create({
        Product,
        Quantity,
        user_id: req.user.id
    });

    res.status(201).json(order);
});

//@get order
//@route GET /api/contacts/:id
//@access private

const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");  
    }
    res.status(200).json(order);
});

//@Update order
//@route PUT /api/contacts/:id
//@access private

const updateOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");  
    }

    if(order.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user orders");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedOrder);
});

//@Delete order
//@route DELETE /api/contacts/:id
//@access private

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");  
    }
    if(order.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user orders");
    }
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json(order);
});
module.exports = { getOrders, createOrder, getOrder, updateOrder, deleteOrder };