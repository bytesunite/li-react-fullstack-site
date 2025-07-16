# Chapter 2 - Creating a Node.js Back-End
## Lesson 5 - Upvoting Articles

Now that we have a basic understanding of sending data with a POST request and using url parameters to gather data from the url, we will put some of this to use.

In this lesson we will create an in-memory database to use as an example. This means that when the server is stopped all that data is lost. In Chapter 3 MongoDB is introduced to provide persistent storage, which will retain data between server restarts.

Create a simple array to represent an in-memory database of articles. Each article will track "upvotes".

[src/server.js]
<pre><code>
import express from 'express';

const articleInfo = [
  { name: 'learn-node', upvotes: 0},
  { name: 'learn-react', upvotes: 0},
  { name: 'mongodb', upvotes: 0},
];
...
</code></pre>

With this in place we will provide a way for our app to send a request to a given url to increment an upvote for a specific article.

To focus on this functionality, the instructor removes all existing endpoints, creating a new post() endpoint to handle upvotes. The instructor mentions this could be a PUT request for those familiar with http methods, but sticks with POST for this example.<br>
The instructor starts building an API, and in doing so decides to introduces the "/api/" path as the root for the API.


[src/server.js]
<pre><code>
import express from 'express'

const articleInfo = [
  { name: 'learn-node', upvotes: 0},
  { name: 'learn-react', upvotes: 0},
  { name: 'mongodb', upvotes: 0},
];

const app = express();

app.use(express.json());

app.post('/api/articles/:name/upvote', (req, res) => {
  const article = articleInfo.find(a => a.name === req.params.name);
  article.upvotes += 1;

  res.send('Success! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes!');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
})
</code></pre>

Start you server. Then go to Postman and make a POST request to "/api/articles/learn-react/upvote" and the response should be "Success! The article learn-react now has 1 upvotes!".<br>
WARNING: the instructor does not introduce any error handling so make sure you use a valid article name for this first test. If you provide an invalid article name a TYPE ERROR is thrown and breaks the app.

Every time you make a new POST request to a valid url it will increment the value of an upvote for an article.

Congrats. You have successfully used url parameters in Express to add upvote functionality.<br>

If your restart the server, every upvote value goes back to 0. This is because memory is storing the array responsible for these values and as soon as you restart the server the Node application recreates the array. Later MongoDB will be used to persist this data.
