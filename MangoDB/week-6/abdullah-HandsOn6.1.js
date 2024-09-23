/*
Author: Malcolm Abdullah
date: September 22nd, 2024 
File name: abdullah-HandsOn6.1.js

description: Hands-On 6.1: Aggregate Queries

*/

//Query a: Display all students
// Displaying all students in the students collection.
db.students.find()

//Query b: Add a new student Add a new student with similar fields.
// Inserting a new student into the students collection.
const newStudent = {
    "firstName": "Hermione",
    "lastName": "Granger",
    "studentId": "s1019",
    "houseId": "h1007" // Gryffindor
}
db.students.insertOne(newStudent)

// Verify the new student was added successfully.
db.students.find({ "studentId": "s1019" })

//Query c: Update the student's property Update a property for the student you added.
// Updating the last name of the student added in step b.
db.students.updateOne(
    { "studentId": "s1019" },
    { $set: { "lastName": "Granger-Weasley" } }
)

// Verify the update was successful.
db.students.find({ "studentId": "s1019" })

// Query d: Delete the student Remove the student you added in step b.
// Deleting the student added in step b.
db.students.deleteOne({ "studentId": "s1019" })

// Verify the student was removed successfully.
db.students.find({ "studentId": "s1019" })

//Query e: Display all students by house Use aggregation to display all students grouped by their house.
// Aggregating students by house.
db.students.aggregate([
    {
        $lookup: {
            from: "houses",
            localField: "houseId",
            foreignField: "houseId",
            as: "house"
        }
    },
    { $unwind: "$house" },
    { $group: { _id: "$house.houseId", students: { $push: "$$ROOT" } } }
])

//Query f: Display all students in house Gryffindor Filter students by house.
// Displaying all students in Gryffindor (houseId: h1007).
db.students.find({ "houseId": "h1007" })

//Query g: Display all students in the house with an Eagle mascot Use a lookup to find the house with the Eagle mascot and then list students.
// Displaying all students in the house with an Eagle mascot (Ravenclaw).
db.students.aggregate([
    {
        $lookup: {
            from: "houses",
            localField: "houseId",
            foreignField: "houseId",
            as: "house"
        }
    },
    { $unwind: "$house" },
    { $match: { "house.mascot": "Eagle" } }
])

