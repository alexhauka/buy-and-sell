-- Schema for < users > related tables come here.
-- Do not alter the order of the tables.
-- Make sure to order correctly if you need to reference ids from another table.

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS user_ratings CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT 'password'
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT DEFAULT 'Dummy text for test purpose.',
  sent_date TIMESTAMP NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating SMALLINT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rater_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);
