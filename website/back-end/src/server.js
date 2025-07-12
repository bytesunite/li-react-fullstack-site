// const express = require('express');
import express from 'express';

const server = express();

server.get('/hello', (req, res)=>{
  res.send('Hello!');
})

server.listen(8000, ()=>{
  console.log('Server listening on port 8000');
});
