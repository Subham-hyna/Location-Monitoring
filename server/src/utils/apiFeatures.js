class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    searchUser() {
      const q = this.queryStr.q
        ? {
            $or : [
                {name: {
                    $regex: this.queryStr.q,
                    $options: "i",
                }},
                {username: {
                    $regex: this.queryStr.q,
                    $options: "i",
                }}
            ]
          }
        : {};
        this.query = this.query.find(q);
      return this;
    }
    
    filter() {
      const queryCopy = { ...this.queryStr };
      
      const removeFields = ["q", "page", "limit", "startDate", "endDate"];
      
      removeFields.forEach((key) => delete queryCopy[key]);
      
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
  
      const skip = resultPerPage * (currentPage - 1);
  
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }  
}

export { ApiFeatures };
