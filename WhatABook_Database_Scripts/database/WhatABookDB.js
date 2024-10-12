/* 
Authors: Malcolm Abdullah, Angelica Gutierrez, Amanda Rovey
Date: 09-30-2024   
Filename:WhatABookDB.js

Description: The following JavaScript script sets up the WhatABook database in MongoDB. It drops existing collections and the database to ensure a clean installation.
*/

// Connect to MongoDB
const { MongoClient, ObjectId} = require('mongodb')

const uri = "mongodb+srv://web335_user:MalikaiJames8110@cluster0.mongodb.net/WhatABook?retryWrites=true&w=majority";
const dbName = "WhatABook";

async function installDatabase() { 
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);

        // Drop the database if it exists
        await db.dropDatabase();
        console.log(`Dropped database: ${dbName}`);

        // Create collections
        const users = db.collection('users');
        const books = db.collection('books');
        const authors = db.collection('authors');
        const genres = db.collection('genres');
        const orders = db.collection('orders');

        // Insert sample authors
        const author1= {_id: new ObjectId(), firstName: "George", lastName: "Orwell"};
        const author2 = {_id: new ObjectId(), firstName: "J.K.", lastName: "Rowling"};
        await authors.insertMany([author1, author2]);

        // Insert sample genres
        const genre1 = {_id: new ObjectId(), genreName: "Dystopian"};
        const genre2 = {_id: new ObjectId(), genreName: "Fantasy"};
        await genres.insertMany([genre1, genre2]);

        // Insert sample books
        const book1 = {
            _id: new ObjectId(),
            title: "1984",
            author: author1,
            genre : genre1,
            price: 15.99
        };
        const book2 = {
            _id: new ObjectId(),
            title: "Harry Potter and the Sorcerer's Stone",
            author: author2,
            genre: genre2,
            price: 12.99
        };
        await books.insertMany([book1, book2]);

        // Insert sample users
        const user1 = {
            _id : new ObjectId(),
            firstName : "John",
            lastName : "Doe",
            email: "john.doe@gmail.com",
            orders : []
        };
        const user2 = {
            _id : new ObjectId(),
            firstName : "Astral",
            lastName : "Mac",
            email: "amac@gmail.com",
            orders : []
        };
        await users.insertMany([user1, user2]);

        // Insert sample orders
        const order1 = {
            _id: new ObjectId(),
            userId: user1._id,
            orderDate: new Date("2024-04-15"),
            books: [
                {bookId: 
                    book1._id, 
                    title : book1.title, 
                    author: `${book1.author.firstName} ${book1.author.lastName}`,
                    genre: book1.genre,
                    price: book1.price,
                    quantity: 1
                }
            ]
        };
        const order2 ={
            _id: new ObjectId(),
            userId: user2._id,
            orderDate: new Date("2024-09-27"),
            books: [
                {bookId: 
                    book2._id, 
                    title : book2.title, 
                    author: `${book2.author.firstName} ${book2.author.lastName}`,
                    genre: book2.genre,
                    price: book2.price,
                    quantity: 1
                },
                {bookId:
                    book1._id,
                    title: book1.title,
                    author: `${book1.author.firstName} ${book1.author.lastName}`,
                    genre : book1.genre,
                    price: book1.price,
                    quantity : 2
                }
            ]
        };
        await orders.insertMany([order1, order2]);

        //update user's orders
        await users.updateMany(
            {_id: { $in: [user1._id, user2._id]}},
            {$push: {orders: [order1, order2]}}
        );

        console.log("Database Installation completed successfully.");
    } catch(err){
        console.error("Error during installation:", err);
    }finally{
        await client.close();
    }
}

installDatabase();