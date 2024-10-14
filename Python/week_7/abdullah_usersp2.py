"""
Title: abdullah_usersp2.py
Author: Malcolm Abdullah
Date: 09-29-2024
Description: Week 7 python program
"""

from pymongo import MongoClient
import datetime

def main():
#Establish a connection to the Mongo Database
   try: 
      connection_string = ("mongodb+srv://web335_user:Bellevue2025@bellevueuniversity.swhfl.mongodb.net/web335db?retryWrites=true&w=majority")
      client = MongoClient(connection_string, tls= True)
      db = client['web335DB']
      print("Successfully connected to the database.\n")
   except Exception as e:
      print(f"An error has occurred while connecting to the database: {e}")
      return
   # Reference to the "users" collection within "web335"
   users_collection =db["users"]
   #Write the Python code to create a new user document.
   new_user = {
   "firstName" : "Astral",
   "lastName" :"Mac",
   "employeeId" : "1895",
   "email" : "a.mac@gmail.com",
   "dateCreated" :  datetime.datetime.now(datetime.timezone.utc)
   }
   # insert the new document into the collection, with exception to catch error
   try:
      inserted_id = users_collection.insert_one(new_user).inserted_id
      print (f"New user inserted with ID: {inserted_id}\n")
   except Exception as e:
      print(f"An error occurred while inserting document : {e}")
      return
   #Write the Python code to prove the document was created.
   try:
      created_user = users_collection.find_one({"employeeId" : "1895"})
      print("Document after creation:")
      print(created_user, "\n")
   except Exception as e:
      print (f"An error occurred while retrieving the document : {e}")
      return
   #Write the Python code to update the email address of the document you created in step 3.
   updated_email = "astralm@outlook.com"
   try: 
      result = users_collection.update_one( 
         {"employeeId" : "1895"},
         {"$set" : {"email" : updated_email}})
      if result.modified_count > 0:
         print("Email address updated successfully \n")
      else:
         print("No documents were updated. \n") 
   except Exception as e:
      print(f"An error occurred while updating document : {e}")
      return

   #Write the Python code to prove the document was updated.
   try:
      updated_user = users_collection.find_one({"employeeId" : "1895"})
      print("Document after update")
      print(updated_user, "\n")
   except Exception as e:
      print(f"An error occurred while retrieving the updated document: {e}")
      return
   #Write the Python code to delete the document that was created in step 3.
   try:
      result = users_collection.delete_one({"employeeId" : "1895"})
      if result.deleted_count > 0:
         print("User deleted successfully. \n")
      else:
         print("No documents were deleted. \n")
   except Exception as e:
      print(f"An error occurred while deleting the document: {e}")
      return
   #Write the Python code to prove the document was deleted.
   try:
      deleted_user = users_collection.find_one({"employeeId" : "1895"})
      if deleted_user is None:
         print("No document found. The document has been deleted. \n")
      else:
         print("Document still exists:", deleted_user,"\n")
   except Exception as e:
      print(f"An error occurred while checking for the deleted document: {e}")
      return
   
if __name__=="__main__":
   main()