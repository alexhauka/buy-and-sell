const db = require('./db');

const getItems = () => {
  return db.query('SELECT * FROM items;')
  .then((response) => {
    return response.rows;
  });
};

const getItemById = (id) => {
  return db.query('SELECT * FROM items WHERE id = $1', [id])
  .then((response) => {
    return response.rows[0];
  });
};

const addItem = (item) => {
  let queryString = `
  INSERT INTO items (
    name,
    description,
    thumbnail_url,
    img_url,
    price,
    date_posted,
    user_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;`

  return db.query(queryString, [
    item.name,
    item.description,
    item.thumbnail_url,
    item.img_url,
    item.price,
    item.date_posted,
    item.user_id
  ]);
};

module.exports = {
  getItems,
  getItemById,
  addItem
};
