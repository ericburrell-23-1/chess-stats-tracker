from datetime import datetime


def convert_timestamp(ts):
    return datetime.utcfromtimestamp(ts) if ts else None


def extract_country_name(country_url):
    if not country_url:
        return None
    return country_url.split('/')[-1]  # e.g., "US"
