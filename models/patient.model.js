const mongoose = require("mongoose");

const Patients = new mongoose.Schema(
  {
    firstname: {
      type: "string",
      required: true,
      trim: true,
    },
    surname: {
      type: "string",
      required: true,
      trim: true,
    },
    lastname: {
      type: "string",
      required: true,
      trim: true,
    },
    passportSeria: {
      type: "string",
      required: true,
      trim: true,
    },
    passportNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    phone: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
      enum: ["tuggan", "tugmagan", "tushib qolgan", "abort qilingan"]
    },
    birthDate: {
      type: Date,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,   
    },
    dateEnd: { 
      type: Date,
      required: false,
    },
    datePeriod: {
      type: Date,
      required: false,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regions",
    },
    children: {
      boy: {
        count: {
          type: Number,
        },
        status: {
          type: String  // tirik o'lik
        },
      },
      girl: {
        count: {
          type: Number,
        },
        status: {
          type: String
        },
      }
    },
    createdAt: {
        type: Date, 
        default: Date.now(),
    },
  }
);

module.exports = mongoose.model("Patients", Patients);
