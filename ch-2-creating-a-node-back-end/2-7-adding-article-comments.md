# Chapter 2 - Creating a Node.js Back-End
## Lesson 7 - Adding Comments

In a previous lesson we created an array of articles to track upvotes. Let's update this array in "src/server.js" to include a "comments" property with a value of an array.

[src/server.js]
<pre><code>
...
const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: []},
  { name: 'learn-react', upvotes: 0, comments: []},
  { name: 'mongodb', upvotes: 0, comments: []},
];
...
</code></pre>

Now, create a new post() endpoint to provide a comment to the server. We will use the request's "name" parameter to to filter out the correct article, and use the request's "body" to gather the data sent along with the POST request, updating the array.<br>
For example the JSON data sent with the request would be {"postedBy":"Shaun", "text":"Awesome"}<br>
The response will use res.json() to return the article object, rather that what we've been using (res.send()) which was returning text.

<pre><code>
...
app.post('/api/articles/:name/comments', (req, res) => {
  const {name} = req.params;
  const {postedBy, text} = req.body;

  const article = articleList.find(a => a.name === name);

  article.comments.push({postedBy, text});

  res.json(article);
}
...
</code></pre>

Next, update the upvotes endpoint to match what we did for the comments endpoint, by returning an object. This will be useful later when we want to render the data to the screen.<br>
So the quick fix is to replace the last line in the comments endpoint with `res.json(article)`

[src/server.js]
<pre><code>
...
app.post('/api/articles/:name/upvote', (req, res) => {
  const article = articleInfo.find(a => a.name === req.params.name);
  article.upvotes += 1;

  res.send(article);
});
...
</code></pre>


Go back to Postman and make some new requests:
- POST request to "/api/comments/learn-node/comments<br>
  data is raw JSON {"postedBy": "Shaun", "text": "Awesome Article"}<br>
  The return value is:
  <pre><samp>
  {
    "name": "learn-node",
    "upvotes": 0,
    "comments": [
      {
        "postedBy": "Shaun",
        "text": "Awesome Article"
      }
    ]
  }
  </samp></pre>
- POST request to "/api/comments/learn-node/comments<br>
  data is raw JSON {"postedBy": "Shaun2", "text": "I agree"}<br>
  The return value is:
  <pre><samp>
  {
    "name": "learn-node",
    "upvotes": 0,
    "comments": [
      {
        "postedBy": "Shaun",
        "text": "Awesome Article"
      },
      {
        "postedBy": "Shaun2",
        "text": "I agree"
      }
    ]
  }
  </samp></pre>


Now try out a request to upvoting and see what the return value looks like.
- POST request to "/api/comments/learn-node/upvote<br>
  no request body<br>
  The return value is:
  <pre><samp>
  {
    "name": "learn-node",
    "upvotes": 1,
    "comments": [
      {
        "postedBy": "Shaun",
        "text": "Awesome Article"
      },
      {
        "postedBy": "Shaun2",
        "text": "I agree"
      }
    ]
  }
  </samp></pre>


At this point our server works pretty well but as soon as the server restarts, all the data is gone. This server is using an array and it gets recreated when the server restarts. The next chapter looks at how we can fix this by storing data in a MongoDB database.
