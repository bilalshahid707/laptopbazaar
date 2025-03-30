const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter laptop name"],
    },
    brand: {
      type: String,
      required: [true, "Enter brand name"],
    },
    generation: {
      type: Number,
      required: [true, "Enter generation"],
    },
    processor: {
      type: String,
      required: [true, "Enter processor"],
    },
    model: {
      type: String,
      required: [true, "Enter model"],
    },
    storage: {
      type: String,
      required: [true, "Enter storage"],
    },
    storageType: {
      type: String,
      required: [true, "Enter storage type"],
    },
    screenSize: {
      type: String,
      required: [true, "Enter screen size"],
    },
    operatingSystem: {
      type: String,
      required: [true, "Enter operating system"],
    },
    price: {
      type: Number,
      required: [true, "Enter price"],
    },
    images: [String],
    inStock: {
      type: Boolean,
      default: true,
    },
    usageType: {
      type: String,
      enum: [
        "student",
        "business",
        "designer",
        "workstation",
        "gaming",
        "convertible",
      ],
    },
    ratingsQuantity: {
      type: Number,
      default:0
    },
    avgRating: {
      type: Number,
      default:0
    },
    description: {
      type: String,
      required: [true, "Enter product description"],
    },
    supplier: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "Laptop can't be added without supplier"],
    },
    listedAt:{
      type:Date,
      default:Date.now()
    }
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);

// Virtual populating reviews
laptopSchema.virtual('reviews',{
    ref:'reviews',
    foreignField:'laptop',
    localField:'_id'
})

// Middlewares
laptopSchema.pre(/^find/, function (next) {
  this.populate("supplier");
  this.sort({listedAt:-1})
  next();
});

const laptopModel = mongoose.model("laptops", laptopSchema);
module.exports = laptopModel;
