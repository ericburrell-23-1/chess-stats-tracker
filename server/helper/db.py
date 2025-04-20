import psycopg2
from psycopg2.extras import RealDictCursor
from config import DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS


def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    return conn


def user_exists(conn, username):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT 1 FROM users WHERE username = %s LIMIT 1;", (username,))
        return cur.fetchone() is not None
