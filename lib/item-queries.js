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

const editItem = (item) => {
  let queryString = `
   UPDATE items
   SET
    name = $2,
    description = $3,
    thumbnail_url = $4,
    img_url = $5,
    price = $6,
    is_sold = $7
   WHERE items.id = $1
   AND items.user_id = $8
   RETURNING *;`

   return db.query(queryString, [
     item.id, //$1
     item.name, //$2
     item.description, //$3
     item.thumbnail_url, //$4
     item.img_url, //$5
     item.price, //$6
     item.is_sold, //$7
     item.user_id //$8
   ]);
};

const addComment = (comment, itemId, userId) => {
  let queryString = `
  INSERT INTO comments (
    comment,
    posted_at,
    item_id,
    user_id
  )
  VALUES ($1, NOW(), $2, $3)
  RETURNING *;`

  return db.query(queryString, [comment, itemId, userId]);
};

module.exports = {
  getItems,
  getItemById,
  addItem,
  editItem,
  addComment
};
