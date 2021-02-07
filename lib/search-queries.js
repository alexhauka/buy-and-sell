const db = require('./db');


// search items by name and/or price
const searchItems = function(options) {
  const queryParams = [];
  let queryString = `
  SELECT items.* FROM items`;

  if (options.name) {
    queryParams.push(`%${options.name}%`);
    queryString += `WHERE items.name LIKE $${queryParams.length}`;
  }
  if (options.min_price) {
    queryParams.push(`${options.min_price}`);
    if (queryParams.length > 1) {
      queryString += `AND items.price >= $${queryParams.length}`;
    } else {
      queryString += `WHERE items.price >= $${queryParams.length}`;
    }
  }
  if (options.max_price) {
    queryParams.push(`${options.max_price}`);
    if (queryParams.length > 1) {
      queryString += `AND items.price <= $${queryParams.length}`;
    } else {
      queryString += `WHERE items.price <= $${queryParams.length}`;
    }
  }

  queryParams.push(`${options.limit}`);

  queryString += `
  ORDER BY items.price ASC
  LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
  .then((response) => {
    return response.rows;
  });
};

module.exports = searchItems;
