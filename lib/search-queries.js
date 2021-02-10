const db = require('./db');


// search items by name and/or price
const searchItems = (options) => {
  const queryForm = {
    string: '',
    params: [],
  };

  const select = `SELECT *`;
  const from = `FROM items`;
  let where = '';
  const orderBy = `ORDER BY price ASC`;

  if (options.name) {
    queryForm.params.push(`%${options.name}%`);
    where += `AND LOWER(name) LIKE LOWER($${queryForm.params.length}) `;
  }

  if (options.min_price) {
    queryForm.params.push(options.min_price);
    where += `AND price >= $${queryForm.params.length} `;
  }
  
  if (options.max_price) {
    queryForm.params.push(options.max_price);
    where += `AND price <= $${queryForm.params.length} `;
  }

  if (where.length > 0) {
    where = `WHERE ${where.slice(4, where.length - 1)}`;
  }

  queryForm.params.push(options.limit);
  const lim = `LIMIT $${queryForm.params.length}`;

  queryForm.string = `${select} ${from} ${where} ${orderBy} ${lim};`;

  return db
    .query(queryForm.string, queryForm.params)
    .then(response => response.rows);
};

module.exports = searchItems;
