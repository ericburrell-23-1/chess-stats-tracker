from flask import jsonify, Blueprint, request
from controllers.users import get_all_users, get_user_by_id, add_new_user

users_bp = Blueprint("users", __name__)


@users_bp.route('/', methods=['GET'])
def send_all_users():
    search_term = request.args.get("search", None)
    return get_all_users(search_term)

# def send_dummy_users():
#     dummy_users = {"users": [
#         {"username": "ericburrell231", "id": 1,
#             "avatar_url": "https://images.chesscomfiles.com/uploads/v1/user/273837733.68832df5.200x200o.b97fc929c676.jpg",
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/hosts/levy.svg",
#             "first_name": "Eric",
#             "last_name": "Burrell"
#          },
#         {"username": "hikaru", "id": 2,
#             "avatar_url": "https://images.chesscomfiles.com/uploads/v1/user/15448422.88c010c1.200x200o.3c5619f5441e.png",
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},
#         {"username": "magnuscarlsen", "id": 3,
#             "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/5/52/HansMokeNiemann23.jpg",
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
#             "first_name": "Hans",
#             "last_name": "Niemann"},
#         {"username": "gothamchess", "id": 4,
#             "avatar_url": "https://images.chesscomfiles.com/uploads/v1/user/33945736.eb0c3771.200x200o.cf06060d2143.png",
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
#             "first_name": "Levy",
#             "last_name": "Rozman"},
#         {"username": "Hikaru", "id": 5,
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},
#         {"username": "Hikaru", "id": 6,
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},
#         {"username": "Hikaru", "id": 7,
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/hosts/hikaru.svg",
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},
#         {"username": "Hikaru", "id": 8,
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},
#         {"username": "Hikaru", "id": 9,
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},
#         {"username": "Hikaru", "id": 10,
#             "flair_url": "https://images.chesscomfiles.com/chess-flair/membership_icons/diamond_traditional.svg",
#             "first_name": "Hikaru",
#             "last_name": "Nakamura"},

#     ]}
#     return jsonify(dummy_users)


@users_bp.route("/")
def users():
    return get_all_users()


@users_bp.route('/<int:user_id>')
def user_by_id(user_id):
    return get_user_by_id(user_id)


@users_bp.route("/new-user/<string:user_id>", methods=["POST"])
def new_user(user_id):
    return add_new_user(user_id)
