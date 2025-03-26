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


if __name__ == "__main__":
    app.run(debug=True)
