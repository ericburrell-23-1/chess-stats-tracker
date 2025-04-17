from flask import jsonify, Blueprint
from server.controllers.users import get_all_users, get_user_by_id

users_bp = Blueprint("users", __name__)


@users_bp.route("/")
def users():
    return get_all_users()


@users_bp.route('/<int:user_id>')
def user_by_id(user_id):
    return get_user_by_id(user_id)
