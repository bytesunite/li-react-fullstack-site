# Chapter 3 - Adding MongoDB to Node.js
# Lesson 3 - Adding MongoDB to Express

With MongoDB installed we have been able to interact with it in the MongoDB shell *mongosh*, so the next step is to learn how to do this from our app.

First, from within the "backend/" directory install the package *mongodb*. This allows us to communicate with MongoDB from our Node server.

<pre>
backend/$ <code>npm install mongodb</code>
</pre>

After installing the *mongodb* package, import *MongoClient* and *ServerApiVersion* from this package into our Node server.

"backend/src/server.js"<br>
<pre><code>
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
...
</code></pre>

Right now our app does not have any routes to read data such as an article. Let's create a new GET route to fetch a new article from our newly created MongoDB database.<br>
NOTE: For now we will leave the *articleInfo* array as a visual as we slowly replace it will calls to MongoDB before it is removed.

This request will be asyncronous so the callback will be preceded by the *async* keyword. The data passed to the instance of MongoClient is some default values. The *uri* will be different based on if you are using CodeSpaces or your local environment. You will then asynchronously connect to the database. You will specify the name of the database that you used when you created your MongoDB database. Finally you will make a new asynchronous query to the database via the collection() method and findOne() for a record with a name that matches the url parameter.<br>
NOTE: If you are using localhost make sure to use the IP address.

"backend/src/server.js"<br>
<pre><code>
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
...
app.get('/api/articles/:name', async(req, res) => {
  const { name } = req.params;

  const uri = 'mongodb://127.0.0.1:27017';

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  await client.connect();

  const db = client.db('full-stack-react-db');

  const article = await db.collection('articles').findOne({name});

  res.json(article);
});
...
</code></pre>


To test this out, make sure your local MongoDB service & webserver is running. For example on Mac with Homebrew it might be:<br>
* $ brew services start mongdb-community
* backend/$ npm run dev

Then open Postman and make a GET request to *http://localhost:8000/api/articles/learn-node* and you should see a JSON object for the *learn-node* article.

If all went well you should be able to query your MongoDB database for articles. <br>
Things to watch out for are to make sure the query is an "async" request, that you are returning json, and when creating a new instance of MongoClient the first argument is a valid uri based on our system. Note, the second argument to MongoClient is a nested object. Unlike *mongosh* you must use *db.collection('articles')* rather than *db.articles* to select a collection.
