from helper.conversions import extract_country_name, convert_timestamp
from helper.db import get_db_connection, user_exists
from services.chess_api_service import fetch_user_profile, fetch_unofficial_user_data


def get_all_users():
    pass


def get_user_by_id(user_id):
    pass


def add_new_user(username):
    profile = fetch_user_profile(username)
    unofficial = fetch_unofficial_user_data(username)

    if not profile:
        return {"error": "User not found"}, 404

    conn = get_db_connection()

    if user_exists(conn, username):
        conn.close()
        return {"message": f"User '{username}' already exists"}, 200

    name = profile.get("name", "")
    first_name = name.split()[0] if name else None
    last_name = name.split()[1, ] if name and len(name.split()) > 1 else None

    if unofficial:
        first_name = unofficial.get("first_name", first_name)
        last_name = unofficial.get("last_name", last_name)

    user_data = {
        "chesscom_id": profile.get("player_id"),
        "username": profile.get("username"),
        "first_name": first_name,
        "last_name": last_name,
        "country_name": extract_country_name(profile.get("country")),
        "avatar_url": profile.get("avatar"),
        "flair_url": unofficial.get("flair", {}).get("images", {}).get("svg") if unofficial else None,
        "chess_title": profile.get("title"),
    }

    try:
        with conn.cursor() as cur:
            insert_query = """
                INSERT INTO users (
                    chesscom_id, username, first_name, last_name,
                    country_name, avatar_url, flair_url, chess_title
                )
                VALUES (%(chesscom_id)s, %(username)s, %(first_name)s, %(last_name)s,
                        %(country_name)s, %(avatar_url)s, %(flair_url)s, %(chess_title)s);
            """
            cur.execute(insert_query, user_data)
            conn.commit()
        conn.close()
        return {"message": "User created"}, 201
    except Exception as e:
        print(f"Error creating user: {e}")
        conn.close()
        return {"error": "Database error"}, 500
