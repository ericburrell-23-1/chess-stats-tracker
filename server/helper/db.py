

def get_db_connection():
    pass


def user_exists(conn, username):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT 1 FROM users WHERE username = %s LIMIT 1;", (username,))
        return cur.fetchone() is not None
