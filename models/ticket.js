const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  nameTicket: {
    type: String,
    required: true,
  },
  priceTicket: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = ticketSchema;
