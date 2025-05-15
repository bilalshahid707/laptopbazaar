const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const bcrypt = require("bcrypt");

const options = {
  discriminatorKey: "role",
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Enter a valid email"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "supplier"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords don't match",
      },
    },
    image: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  options
);

const supplierSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, "Business must have a name"],
      unique: true,
    },
    businessPhone: {
      type: String,
      required: [true, "Enter business phone number"],
      unique: true,
    },
    businessWebsite: {
      type: String,
      unique: true,
    },
    businessType: {
      type: String,
      required: [true, "Enter your business type"],
      enum: ["retail", "wholesale"],
    },
    slug: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Enter location"],
    },
    tagline: {
      type: String,
    },
    listedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  options
);

// Middlewares
supplierSchema.pre("save", function () {
  this.slug = slugify(this.businessName, {
    lower: true,
    trim: true,
    replacement: "-",
  });
});
supplierSchema.pre("save", function () {
  this.businessPhone.replace(this.businessPhone[0],"+92")
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt=Date.now()
    next()
});

// Methods
userSchema.methods.correctPassword = function (password, userPassword) {
  return bcrypt.compare(password, userPassword);
};
userSchema.methods.changedPassword = function(tokenIssueTime){
    if (this.passwordChangedAt){
        return this.passwordChangedAt<tokenIssueTime
    }
    return false
}

exports.user = mongoose.model("users", userSchema);
exports.supplier = exports.user.discriminator("supplier", supplierSchema);
