import requests
import json


def fetch_user_profile(username):
    url = f"https://api.chess.com/pub/player/{username}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
    else:
        data = None

    return data


def fetch_user_stats(username):
    url = f"https://api.chess.com/pub/player/{username}/stats"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
    else:
        data = None

    return data


def fetch_unofficial_user_data(username):
    url = f"https://www.chess.com/callback/user/popup/{username}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
    else:
        data = None

    return data
