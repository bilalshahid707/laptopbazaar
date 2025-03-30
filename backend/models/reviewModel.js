const mongoose = require("mongoose");
const laptopModel = require("../models/laptopModel");
const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "review cannot be empty"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "review must be posted by user"],
  },
  laptop: {
    type: mongoose.Schema.ObjectId,
    ref: "laptops",
    required: [true, "review must be for a laptop"],
  },
});

reviewSchema.pre(/^find/, function () {
  this.populate("user").populate({ path: "laptop", select: "_id" });
});

// Average rating
reviewSchema.statics.avgRating = async function (laptopId) {
  const ratings = await this.aggregate([
    {
      $match: {
        laptop: laptopId,
      },
    },
    {
      $group: {
        _id: "$laptop",
        ratingsQuantity: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await laptopModel.findByIdAndUpdate(laptopId, {
    ratingsQuantity: ratings[0].ratingsQuantity,
    avgRating: ratings[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.avgRating(this.laptop);
});

const reviewModel = mongoose.model("reviews", reviewSchema);
module.exports = reviewModel;
