const db = require('./db');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
  .then((response) => {
    return response.rows;
  });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
  .then((response) => {
    return response.rows[0];
  });
};

const getFavorites = (id) => {
  return db.query(`
  SELECT items.*, favorites.user_id as user
  FROM favorites
  JOIN items ON favorites.item_id = items.id
  WHERE favorites.user_id = $1;`, [id])
  .then((response) => {
    return response.rows;
  });
};

const getMessages = (id) => {
  return db.query(`
  SELECT * FROM messages
  WHERE sender_id = $1
  OR receiver_id = $1;`, [id])
  .then((response) => {
    return response.rows;
  });
};

module.exports = {
  getUsers,
  getUserById,
  getFavorites,
  getMessages
};
