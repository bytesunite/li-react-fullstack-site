# Chapter 3 - Adding MongoDB to Node.js
## Lesson 4 - Rewriting the upvote endpoint

Most the endpoints still use the *articleInfo* array rather than the database, so it is time to update the routes.

But before doing this we need to find a more efficient way to connect to MongoDB. It is always best not to repeat yourself in every route. To address this let's first refactor the MongoDB connection code out of individual routes/endpoints.

Create a new async function named *connectToDB()* that will be responsible for connecting to the db. Cut and paste most of the code from the last lesson and paste it into this function.<br>
Create a variable outside of this function named *db* to store the results of calling *connectToDB()*<br>

<pre><code>
...
let db;

async function connectToDB(){
  const uri = 'mongodb://127.0.0.1:27017';

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      depecationErrors: true,
    }
  });

  await client.connect();

  db = client.db('full-stack-react-db');
}
...
</code></pre>


With the *connectToDB()* helper function, we can start up the connection to the MongoDB database and then start the server. Create a new async function *start()* in the Node server. This function will be invoked to connect to the DB and start the server.<br>

<pre><code>
...
async function start() {
  await connectToDB();
  app.listen(8000, function() {
    console.log('Server is listening on port 8000');
  });
}

start();
</code></pre>


It is then possible to interact with the database via the *db* variable. Let's update the endpoint from the last lesson and try it out. We still need to make sure the endpoint callback uses an async function because the endpoint must wait for a response from the database before using the data in the endpoint callback.

<pre><code>
...
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  
  const article = await db.collection('articles').find({name});

  res.json(article);
});
...
</code></pre>


Go ahead and start up your web server and database if they are not already running and make a GET request with Postman to "https://localhost:8000/api/articles/learn-node". 

If all went well you should get the same results as the last lesson. The only difference is we are now connecting to the database when starting our Express web server.

Let's update another endpoint to use the MongoDb database rather than the *articleInfo* static array. For example, let's update the POST endpoint for upvoting an article. This will require a few changes. The query to the database must be an async request and although MongoDB has an *updateOne* method and *$inc* property, it also has a method *findOneAndUpdate()* to update the record and return the updated record. 
* update the callback to use the *async* keyword
* The database query uses the *await* keyword
* The findOneAndUpdate() query will update a single record and returns the record.
* The $inc property is provided a field & value of a positive/negative increment
* {returnDocument : "after"} or a value of "before" specifies before/after changes

<pre><code>
app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;

  const updatedArticle = await db.collection('articles').findOneAndUpdate({name} , {
    $inc: { upvotes: 1 }
  }, { 
    returnDocument : "after"
  });

  res.json(updatedArticle);
});
</code></pre>

So these changes tells MongoDB that we want to look inside the "articles" collection for a record where the "name" field matches the url parameter "name" value. Then, $inc is special syntax to MongoDb which allows you to specify a field name and an increment value. You can increment a value by 1, 2, etc. Finally the "returnDocument" property allows you to decide if you want to return the record before or after the changes have been made. This is helpful in the sense that you don't have to specify 2 different queries to update and find a record.

Go a head an start the web server and db if they are not already running. Then open Postman and make a GET request to "http://localhost:8000/api/articles/learn-node" and take a look at how many upvotes it has. Then make a POST request to "http://localhost:8000/api/articles/learn-node/upvote" and you should see that the upvotes has been incremented. To verify this you can go back to the previous GET request and it should also reflect updates were made to your database for the "learn-node" record.

This lesson has
* created a new endpoint to query the database for a specific article
* updated an endpoint to query the database for a specific article and update upvotes
* made it possible to store data in a database that persists between server restarts
