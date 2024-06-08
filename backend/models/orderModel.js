const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

    const orderSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        Product: {
            type: String,
            required: [true, "Please add the product"],
        },

        Quantity: {
            type: String,
            required: [true, "Please add the Quantity"],
        },    
        },
        {
            timestamps: true,
            }
        );

module.exports = mongoose.model("Order", orderSchema);