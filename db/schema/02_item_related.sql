-- Schema for < items > related tables come here.
-- Do not alter the order of the tables.
-- Make sure to order correctly if you need to reference ids from another table.

DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  description TEXT DEFAULT 'Product description will be stored here.',
  thumbnail_url VARCHAR(255) DEFAULT '../../img/thumb_default.jpeg',
  img_url VARCHAR(255) DEFAULT '../../img/thumb_default.jpeg',
  price INTEGER NOT NULL DEFAULT 0,
  date_posted TIMESTAMP NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  comment TEXT DEFAULT 'Dummy comment for test purpose.',
  posted_at TIMESTAMP,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);
