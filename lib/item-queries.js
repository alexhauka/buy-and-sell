const db = require('./db');

const getItems = () => {
  return db.query(`SELECT items.*, users.name as user_name
  FROM items
  JOIN users ON items.user_id = users.id
  LIMIT 10;`)
  .then((response) => {
    console.log(response.rows[0]);
    return response.rows;
  });
};

const getItemById = (id) => {
  return db.query(`SELECT items.*, users.name as user_name
  FROM items
  JOIN users ON items.user_id = users.id
  WHERE items.id = $1`, [id])
  .then((response) => {
    return response.rows[0];
  });
};

const getUserItems = (userId) => {
  return db.query(`
  SELECT items.*
  FROM items
  JOIN users ON items.user_id = users.id
  WHERE items.user_id = $1
  `, [userId])
  .then((response) => {
    return response.rows;
  });
};

const addItem = (item) => {
  const postTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let queryString = `
  INSERT INTO items (
    name,
    description,
    price,
    date_posted,
    user_id
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`

  return db.query(queryString, [
    item.name, //1
    item.description, //2
    item.price * 100, //3
    postTime, // 4
    item.user_id //5
  ])
  .then((response) => {
    return response.rows[0];
  });
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
   ])
   .then((response) => {
    return response.rows[0];
  });

};

const deleteItem = (item) => {
  let queryString = `
    DELETE FROM items
    WHERE items.id = $1
    AND items.user_id = $2;`

  return db.query(queryString, [item.id, item.user_id])
  .then((response) => {
    return response.rows;
  });
}

const addComment = (comment, itemId, userId) => {
  let queryString = `
  INSERT INTO comments (
    comment,
    posted_at,
    item_id,
    user_id
  )
  VALUES ($1, NOW(), $2, $3)
  RETURNING *;
  `
  return db.query(queryString, [comment.comment, itemId, userId])
  .then((response) => {
    return response.rows[0];
  });
};

const getComments = (itemId) => {
  let queryString = `
  SELECT comments.*, users.name as name
  FROM comments
  JOIN users ON comments.user_id = users.id
  WHERE item_id = $1
  ORDER BY posted_at DESC;
  `;

  return db.query(queryString, [itemId])
  .then((response) => {
    return response.rows;
  });
};

const changeItemToSold = (itemId, userId) => {
  let queryString = `
  UPDATE items
    SET
     is_sold = true
    WHERE items.id = $1
    AND items.user_id = $2
    RETURNING *;
  `

  return db.query(queryString, [itemId, userId])
  .then((response) => {
    return response.rows[0];
  })
};

module.exports = {
  getItems,
  getItemById,
  getUserItems,
  addItem,
  editItem,
  deleteItem,
  getComments,
  changeItemToSold,
  addComment
};
