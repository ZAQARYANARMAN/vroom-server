import mongoose from "mongoose";
import { 
  bodyTypes, 
  colors, 
  currencyList, 
  driveTypes, 
  gearBoxTypes, 
  interiorMaterials, 
  runningCurrency, 
  sides, 
  years 
} from "../data/data.js";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Please provide the car brand"],
    minlength: [1, "Brand name must contain at least 1 character"],
    maxlength: [50, "Brand name cannot exceed 50 characters"],
    trim: true,
    uppercase: true
  },
  model: {
    type: String,
    required: [true, "Please provide the car model"],
    minlength: [1, "Model name must contain at least 1 character"],
    maxlength: [50, "Model name cannot exceed 50 characters"],
    trim: true,
    lowercase: true
  },
  pictures: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: [true, "Please provide the car price"],
    min: [0, "Price must be greater than or equal to 0"]
  },
  priceCurrency: {
    type: String,
    required: [true, "Please specify the currency for the price"],
    enum: {
      values: currencyList,
      message: "{VALUE} is not a valid currency"
    },
    lowercase: true
  },
  year: {
    type: Number,
    required: [true, "Please provide the manufacturing year"],
    enum: {
      values: years,
      message: "{VALUE} is not a valid year"
    }
  },
  running: {
    type: Number,
    required: [true, "Please provide the running distance"],
    min: [0, "Running distance cannot be negative"]
  },
  runningCurrency: {
    type: String,
    required: [true, "Please specify the unit of running distance"],
    enum: {
      values: runningCurrency,
      message: "{VALUE} is not a valid unit"
    }
  },
  engine: {
    type: Number,
    required: [true, "Please provide the engine displacement (L)"],
    min: [0, "Engine displacement cannot be negative"],
    max: [10, "Engine displacement must not exceed 10 liters"]
  },
  description: {
    type: String,
    required: [true, "Please add a description for the car"],
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: [true, "Please provide the address or location"],
    lowercase: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    immutable: true,
    ref: "User"
  },
  color: {
    type: String,
    required: [true, "Please provide the car color"],
    enum: {
      values: colors,
      message: "{VALUE} is not a valid color"
    }
  },
  horsepower: {
    type: Number,
    required: [true, "Please provide the horsepower"],
    min: [0, "Horsepower cannot be negative"]
  },
  gearBox: {
    type: String,
    required: [true, "Please specify the gearbox type"],
    enum: {
      values: gearBoxTypes,
      message: "{VALUE} is not a valid gearbox type"
    }
  },
  sterringWheel: {
    type: String,
    required: [true, "Please specify the steering wheel side"],
    enum: {
      values: sides,
      message: "{VALUE} is not valid. Choose left or right"
    }
  },
  interiorMaterial: {
    type: String,
    required: [true, "Please specify the interior material"],
    enum: {
      values: interiorMaterials,
      message: "{VALUE} is not a valid interior material"
    }
  },
  interiorColor: {
    type: String,
    required: [true, "Please specify the interior color"],
    enum: {
      values: colors,
      message: "{VALUE} is not a valid interior color"
    }
  },
  bodyType: {
    type: String,
    required: [true, "Please provide the body type"],
    enum: {
      values: bodyTypes,
      message: "{VALUE} is not a valid body type"
    }
  },
  drive: {
    type: String,
    required: [true, "Please provide the drive type"],
    enum: {
      values: driveTypes,
      message: "{VALUE} is not a valid drive type"
    }
  }
}, {
  versionKey: false
});

export default mongoose.model("Car", carSchema);