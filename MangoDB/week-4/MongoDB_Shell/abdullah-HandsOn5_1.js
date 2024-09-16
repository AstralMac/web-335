/*
Author: Malcolm Abdullah
Date: September 15th, 2024
Filename:abdullah-HandsOn5_1.js

Description: Performing various operations on the user's collection from Assignment 4.2 using MongoDB Shell.
*/

// Adding a new user to the user's collection
db.users.insertOne({
  "firstName": "Joyner",
	"lastName": "Lucas",
	"employeeId": "0418",
	"email": "jlucas@me.com",
	"dateCreated": new Date()
})

// Verifying the new user was added successfully
db.users.find({email: "jlucas@me.com"})

// Updating Mozart's email address
db.users.updateOne(
  {lastName: "Mozart"}, // Query to find mozart
  {$set: {email: "mozart@me.com"}} //update to set new email
)

// Verifying the update was successful
db.users.find({lastName: "Mozart"}, {firstName: 1, lastName: 1, email:1})

// Display all users with only firstName, lastName, and email fields
db.users.find(
  {}, // Empty query object to select all users
  { projection: { _id: 0} } // projection object
).pretty();
