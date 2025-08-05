// const express = require('express');
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
UNCOMMENT after generating your credentials on Firebase and updating your credentials.json file

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
*/

const app = express();

app.use(express.json())

let db;

async function connectToDB() {
  const uri = 'mongodb://127.0.0.1:27017';

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  db = client.db('full-stack-react-db');
}

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;

  const article = await db.collection('articles').findOne({name});

  res.json(article);
})

app.use(async function(req, res, next) {
  const { authtoken } = req.headers;

  if(authtoken){
    const user = admin.auth().verifyIdToken(authtoken);
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const {name} = req.params;
  const {uid} = req.user;

  const article = await db.collection('articles').findOne({ name });

  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !article.upvoteIds.includes(uid);

  if(canUpvote) {
    const updatedArticle = await db.collection('articles').findOneAndUpdate({name},{
      $inc: { upvotes: 1},
      $push: { upvoteIds: uid }, 
    }, {
      returnDocument: "after",
    });
  } else {  
    res.sendStatus(403); // not authorized
  };
  
  res.json(updatedArticle);
});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };

  const updatedArticle = await db.collection('articles').findOneAndUpdate({name}, {
    $push: { comments: newComment },
  }, {
    returnDocument: "after"
  });

  res.json(updatedArticle);
})

const PORT = process.env.PORT || 8000;

async function start(){
  await connectToDB();

  app.listen(PORT, ()=>{
    console.log('Server listening on port' + PORT);
  });
}

start();
