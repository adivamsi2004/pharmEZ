import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(r"c:\Users\adiva\OneDrive\Documents\pharmEZ-main\pharmEZ-main\.env")
MONGO_URI = os.getenv("MONGO_URI")

for kwargs in [
    {"serverSelectionTimeoutMS": 5000},
    {"serverSelectionTimeoutMS": 5000, "tls": True, "tlsAllowInvalidCertificates": True},
    {"serverSelectionTimeoutMS": 5000, "tls": True, "tlsCAFile": certifi.where()},
]:
    print(f"\nTrying kwargs: {kwargs}")
    client = MongoClient(MONGO_URI, **kwargs)
    try:
        print(client.admin.command('ping'))
        print("Success!")
    except Exception as e:
        print(f"Failed: {e}")
