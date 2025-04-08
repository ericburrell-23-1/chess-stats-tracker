from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from db_connection import get_db_connection

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is running!"})


@app.route('/api/games', methods=['GET'])
def get_games():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM games;")
    games = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(games)


@app.route('/api/users', methods=['GET'])
def send_dummy_users():
    dummy_users = {"users": [
        {"username": "ericburrell231", "id": 1,
            "avatar_url": "https://images.chesscomfiles.com/uploads/v1/user/273837733.68832df5.200x200o.b97fc929c676.jpg",
            "flair_url": "https://images.chesscomfiles.com/chess-flair/hosts/levy.svg",
            "first_name": "Eric",
            "last_name": "Burrell"
         },
        {"username": "hikaru", "id": 2,
            "avatar_url": "https://images.chesscomfiles.com/uploads/v1/user/15448422.88c010c1.200x200o.3c5619f5441e.png",
            "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
            "first_name": "Hikaru",
            "last_name": "Nakamura"},
        {"username": "magnuscarlsen", "id": 3,
            "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/5/52/HansMokeNiemann23.jpg",
            "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
            "first_name": "Hans",
            "last_name": "Niemann"},
        {"username": "gothamchess", "id": 4,
            "avatar_url": "https://images.chesscomfiles.com/uploads/v1/user/33945736.eb0c3771.200x200o.cf06060d2143.png",
            "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
            "first_name": "Levy",
            "last_name": "Rozman"},
        {"username": "Hikaru", "id": 5,
            "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
            "first_name": "Hikaru",
            "last_name": "Nakamura"},
        {"username": "Hikaru", "id": 6,
            "first_name": "Hikaru",
            "last_name": "Nakamura"},
        {"username": "Hikaru", "id": 7,
            "flair_url": "https://images.chesscomfiles.com/chess-flair/hosts/hikaru.svg",
            "first_name": "Hikaru",
            "last_name": "Nakamura"},
        {"username": "Hikaru", "id": 8,
            "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
            "first_name": "Hikaru",
            "last_name": "Nakamura"},
        {"username": "Hikaru", "id": 9,
            "first_name": "Hikaru",
            "last_name": "Nakamura"},
        {"username": "Hikaru", "id": 10,
            "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
            "first_name": "Hikaru",
            "last_name": "Nakamura"},

    ]}
    return jsonify(dummy_users)


if __name__ == "__main__":
    app.run(debug=True)
