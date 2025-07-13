// const express = require('express');
import express from 'express';

const articleInfo = [
  { articleName: 'learn-node', upvotes: 0},
  { articleName: 'learn-react', upvotes: 0},
  { articleName: 'mongodb', upvotes: 0},
];

const app = express();

app.use(express.json())

app.post('/api/articles/:name/upvote', (req, res) => {
  const article = articleInfo.find(a => a.articleName === req.params.name);
  article.upvotes += 1;

  res.send('Success! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes!');
});

app.listen(8000, ()=>{
  console.log('Server listening on port 8000');
});
