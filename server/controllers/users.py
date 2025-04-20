from helper.conversions import extract_country_name, convert_timestamp
from helper.db import get_db_connection, user_exists
from services.chess_api_service import fetch_user_profile, fetch_unofficial_user_data


def get_all_users(search_term):
    conn = get_db_connection()

    search = "%"
    if search_term:
        search = f"%{search_term}%"

    print(f"Querying db with search param = {search}")
    try:
        results = {}
        with conn.cursor() as cur:
            select_query = """
                SELECT * FROM users
                WHERE username ILIKE %s
                    OR first_name ILIKE %s
                    OR last_name ILIKE %s
                    OR (first_name || ' ' || last_name) ILIKE %s
                ORDER BY last_accessed DESC
                LIMIT 10
            """

            cur.execute(select_query, (search, search, search, search))
            rows = cur.fetchall()
            colnames = [desc[0] for desc in cur.description]
            users = [dict(zip(colnames, row)) for row in rows]

        return {"users": users}, 200

    except Exception as e:
        print(f"Error getting users: {e}")
        return {"error": "Database error"}, 500

    finally:
        conn.close()


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
    if name:
        name_parts = name.split()
        first_name = name_parts[0]
        last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else None
        print("First and last name assigned from official profile.")
    else:
        first_name = None
        last_name = None
        print("First and last name assigned as none.")

    if unofficial:
        u_first = unofficial.get("firstName")
        u_last = unofficial.get("lastName")
        if u_first and u_last:
            first_name = u_first
            last_name = u_last
            print("First and last name re-assigned from unofficial data.")

    print(f"Unofficial: {unofficial}")
    user_data = {
        "chesscom_id": profile.get("player_id"),
        "username": profile.get("username"),
        "first_name": first_name,
        "last_name": last_name,
        "country_name": extract_country_name(profile.get("country")),
        "avatar_url": profile.get("avatar"),
        "flair_url": ((unofficial.get("flair") or {}).get("images") or {}).get("svg", None) if unofficial else None,
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
        return {"message": f"User '{username}' added"}, 201
    except Exception as e:
        print(f"Error creating user: {e}")
        conn.close()
        return {"error": "Database error"}, 500
