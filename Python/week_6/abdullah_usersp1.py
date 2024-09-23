"""
Title: abdullah_usersp1.py
Author: Malcolm Abdullah
Date: September 22nd, 2024
description: exercise 4.2: Python with MongoDB, Part I
"""

# Import the MongoClient
from pymongo import MongoClient

# Build a connection string to connect to MongoDB
client = MongoClient("mongodb+srv://web335_user:s3cret@cluster0.lujih.mongodb.net/web335DB?retryWrites=true&w=majority")

# Access the database and collection
db = client['web335DB']
users_collection = db['users']

# Function to display all documents in the user's collection
def display_all_users():
    print("All users in the collection:")
    for user in users_collection.find({}, {"firstName": 1, "lastName": 1}):
        print(user)

# Function to display a document where employeeId is 1011
def display_user_by_employeeId(employeeId):
    print(f"\nUser with employeeId {employeeId}:")
    user = users_collection.find_one({"employeeId": str(employeeId)})
    print(user)

# Function to display a document where lastName is Mozart
def display_user_by_lastName(lastName):
    print(f"\nUser with lastName {lastName}:")
    user = users_collection.find_one({"lastName": lastName})
    print(user)

# Execute the functions
if __name__ == "__main__":
    display_all_users()  # Display all users
    display_user_by_employeeId(1011)  # Display user with employeeId 1011
    display_user_by_lastName("Mozart")  # Display user with lastName Mozart