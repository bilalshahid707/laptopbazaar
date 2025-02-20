class ApiFeatures {
  constructor(query, queryObject, model) {
    this.query = query;
    this.queryObject = queryObject;
    this.model = model;
  }

  filter() {
    let queryObj = { ...this.queryObject };
    const excludedFields = ["page", "limit", "sort","name"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    queryObj = JSON.parse(queryString);

    if (this.queryObject.sort) {
      if (this.queryObject.sort === "low-to-high") {
        this.query = this.model.find(queryObj).sort({ price: 1 });
      } else if (this.queryObject.sort === "high-to-low") {
        this.query = this.model.find(queryObj).sort({ price: -1 });
      }
    } else {
      this.query = this.model.find(queryObj);
    }
    return this;
  }

  pagination() {
    if (this.queryObject.page) {
      const page = this.queryObject.page * 1 || 1;
      this.query = this.query.skip(12 * (page - 1)).limit(12);
    }
    return this;
  }
}
module.exports = ApiFeatures;
