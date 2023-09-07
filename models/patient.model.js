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
      default: "Nurse",
    },
    birthDate: {
      type: String,
      required: true,
    },
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: false,
    },
    datePeriod: {
      type: String,
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
        type: String, 
        default: Date.now(),
    },
  }
);

module.exports = mongoose.model("Patients", Patients);
