/*
Authors: Malcolm Abdullah, Angelica Gutierrez, Amanda Rovey
Date: 09-30-2024   
Filename:queries.js

description: Running the required queries
*/

const {MongoClient, ObjectId} = require('mongodb');

const uri = "mongodb+srv://web335_user:MalikaiJames8110@cluster0.mongodb.net/WhatABook?retryWrites=true&w=majority";
const dbName = "WhatABook";

async function runQueries(){
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);

        //1. Query to display a list of books
        const listOfBooks = await db.collection('books').find({}, {projection: {title: 1, _id:0}}).toArray();
        console.log("List of Books:");
        console.log(listOfBooks);

        //2. Query to display a list of books by genre
        const genre = "Fantasy"; //Example genre
        const booksByGenre = await db.collection('books').find({"genre.genreName": genre}, {projection: {title:1, _id:0}}).toArray();
        console.log(`\nBooks in Genre: ${genre}`);
        console.log(booksByGenre);

        //3. Query to display a list of books by author
        const authorName= "George Orwell"; //Example Author
        const [firstName, lastName] = authorName.split(" ");
        console.log(booksByAuthor);

        //4. Query to display a book by bookId
        const bookId = "PUT_BOOK_ID_HERE";// Replace with an actual bookId
        if(ObjectId.isValid(bookId)){
            const book= await db.collection('books').findOne({_id: ObjectId(bookId)});
            console.log(`\nBook with ID ${bookId}:`);
            console.log(book);
        }else{
            console.log("\nInvalid bookId provided.");
        }
    }catch(err){
        console.error("Error running queries:", err);
    }finally{
        await client.close();
    }
}

runQueries();