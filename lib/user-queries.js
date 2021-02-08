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

const addFavorite = (userId, itemId) => {
  let queryString = `
  INSERT INTO favorites (
    user_id,
    item_id
  )
  VALUES ($1, $2)
  RETURNING *;`

  return db.query(queryString, [userId, itemId]);
}

const getMessages = (userId) => {
  return db.query(`
  SELECT * FROM messages
  WHERE sender_id = $1
  OR receiver_id = $1;`, [userId])
  .then((response) => {
    return response.rows;
  });
};

const getMessage = (userId, otherId) => {
  return db.query(`
  SELECT DISTINCT * FROM messages
  WHERE (sender_id = $1 OR receiver_id = $1)
  AND (sender_id = $2 OR receiver_id = $2)
  ORDER BY messages.id;`, [userId, otherId])
  .then((response) => {
    return response.rows;
  });
};

const sendMessage = (message, senderId, recId) => {
  const sentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let queryString = `
  INSERT INTO messages (
    message,
    sent_date,
    sender_id,
    receiver_id
  )
  VALUES ($1, $2, $3, $4)
  RETURNING *;`

  return db.query(queryString, [message, sentTime, senderId, recId]);
}

module.exports = {
  getUsers,
  getUserById,
  getFavorites,
  addFavorite,
  getMessages,
  getMessage,
  sendMessage
};
