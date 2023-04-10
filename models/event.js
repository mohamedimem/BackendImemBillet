const mongoose = require("mongoose");
const ticketSchema = require("./ticket");

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      debutTime: {
        type: String,
        required: true,
        trim: true,
      },
      finTime: {
        type: String,
        required: true,
        trim: true,
      },
      debutMois: {
        type: String,
        required: true,
        trim: true,
      },
      finMois: {
        type: String,
        required: true,
        trim: true,
      },
      userId: {
        type: String,
        required: true,
        trim: true,
      },
      images: [
        {
          type: String,
          required: true,
        },
      ],
      category: {
        type: String,
        required: true,
      },
      userId: {
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

const EventM= mongoose.model("EventM",eventSchema)
module.exports = { EventM, eventSchema };
