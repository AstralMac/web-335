/*
Authors: Malcolm Abdullah, Angelica Gutierrez, Amanda Rovey
Date: 09-30-2024   
Filename:WAB_tests.js

description: Testing for Database connection, collection creation, data insertion, data retrieval, data integrity
*/

const {MongoClient, ObjectId} = require('mongodb');
const WhatABookDb = require('../database/WhatABookDB'); // ensure script exports necessary functions

const uri = "mongodb+srv://web335_user:MalikaiJames8110@cluster0.mongodb.net/WhatABook?retryWrites=true&w=majority";
const dbName = "WhatABook";

let client;
let db;

beforeAll(async () => {
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  await WhatABookDb.installDatabase(); // Assuming the function was exported
});

afterAll(async ()=> {
  await client.close();
});

describe('WhatABook Database Tests', () => {
  test('Should connect to the database', async() => {
    const admin = db.admin();
    const info = await admin.listDatabases();
    const dbList= info.databases.map(d => d.name);
    expect(dbList).toContain(dbName);
  });

  test('Should have required collections', async()=> {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    expect(collectionNames).toEqual(
      expect.arrayContaining(['users','books','authors','genres', 'orders'])
    );
  });

  test('Should insert sample data correctly', async() => {
    const user = await db.collection('users').findOne({email: "john.doe@gmail.com"});
    expect(user).toBeDefined();
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
  });

  test('Should retrieve list of books', async() => {
    const books = await db.collection('books').find({}, {projection: {title: 1, _id: 0}}).toArray();
    expect(books.length).toBeGreaterThan(0);
    books.forEach(book => {
      expect(book).toHaveProperty('title');
    });
  });

  test('Should retrieve books by genre', async() => {
    const genre ="Fantasy";
    const books = await db.collection('books').find({"genre.genreName": genre}, {projection: {title: 1, _id: 0}}).toArray();
    books.forEach(book => {
      expect(book).toHaveProperty('title');
    });
  });

  test('Should retrieve books by author', async ()=> {
    const authorName = "George Orwell";
    const [firstName, lastName] = authorName.split(" ");
    const books = await db.collection('books').find({"author.firstName": firstName, "author.lastName": lastName}, {projection: {title: 1, _id: 0}}).toArray();
    books.forEach(book => {
      expect(book).toHaveProperty('title');
    });
  });

  test('Should retrieve a book by bookId', async () => {
    const book = await db.collection('books').findOne({});
    const foundBook = await db.collection('books').findOne({_id: book._id});
    expect(foundBook).toBeDefined();
    expect(foundBook.title).toBe(book.title);
  });
});