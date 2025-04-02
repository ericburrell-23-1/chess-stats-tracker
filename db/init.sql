-- db/init.sql

CREATE TYPE result_enum AS ENUM ('win', 'loss', 'draw', 'abort');
CREATE TYPE result_method_enum AS ENUM ('checkmate', 'resignation', 'timeout', 'abandonment', 'stalemate', 'insufficient_material', 'timeout_vs_insufficient_material', 'repetition', '50_move', 'mutual_agreement', 'abort');
CREATE TYPE chess_title_enum as ENUM ('CM', 'NM', 'FM', 'IM', 'GM', 'WCM', 'WFM', 'WNM', 'WIM', 'WGM');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  chess_title chess_title_enum,
  country_name VARCHAR(60),
  avatar_url TEXT,
  flair_url TEXT
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    result result_enum NOT NULL,
    result_method result_method_enum NOT NULL,
    opening_name VARCHAR(100) NOT NULL,
    time_control VARCHAR(20) NOT NULL,
    move_sequence TEXT NOT NULL,
    date_played DATE NOT NULL
);

CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id) ON DELETE CASCADE NOT NULL,
    move_number INTEGER NOT NULL,
    move TEXT NOT NULL,
    evaluation REAL,
    time_remaining INTEGER NOT NULL,
    mistake BOOLEAN NOT NULL,
    inaccuracy BOOLEAN NOT NULL
);
