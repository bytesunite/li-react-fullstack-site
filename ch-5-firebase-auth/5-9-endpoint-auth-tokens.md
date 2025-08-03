# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson Protecting Endpoints Using Auth Tokens

In the last lesson we used Firebase Admin to connect our Node backend. We learning this is powerful and potentially dangerous because the credentials we have in Node has access to you Firebase account. It is important to secure the credentials JSON file or someone will have admin rights to your Firebase account.

Next, we will update our app's upvote and comment features to limit them to logged in users. We will also try to limit a user to 1 upvote.

Using Express middleware, we will check every request to determine who is making the request.

Express has a `use()` function that is used to execute middleware. We can use this to execute a function after every request. Where we place `use()` in our code is important to determine which routes the middleware applies to, and which ones it doesn't.<br> 
We still want visitors that are not logged in to view articles via the get request to "api/articles/:name". So instead of putting the middleware above this get request, we will define it AFTER this get request in our server code. The `use()` middleware is put BEFORE the post request to "api/articles/:name/upvote" to make sure the middleware is called for the upvote request.

The middleware function `use()` is similar to a get request, in the sense it accepts (request, response) parameters. But you can also specify a third parameter "next", (req, res, next). The third parameter, "next", is a function we can call to tell Express when our middleware is done. It is also important where you call this function as it will apply to all endpoints below it, but NOT to endpoints above it.

back-end/src/server.js
<pre><code>...
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ name });
  res.json(article);
});

// Apply middleware to all endpoints following this function, NOT endpoints above it
app.use(async function(req, res, next) {
...
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  ...
})
</code></pre>

Inside the middleware function we will use something called an "authtoken", which is just a really long string that we will require the client-side to send along with the request, in the request headers. Using Firebase Admin we can verify which user is making the request & return the user details. We will then use Firebase Admin to verify and return user details.<br>
If the user is valid, we can add the user to the request header. This makes the data available in our endpoints via `req.params`.<br>
If the user did not send all the required information a status code of 400 is returned, and the user is not added to the request headers.<br>
Finally we need to call `next()` to tell Express that our middleware is finished and to continue.

<code><pre>...
app.use(async function(req, res, next) {
  const { authtoken } = req.headers;

  if( authtoken ){
    const user = await admin.auth().verifyToken(authtoken);
    req.user = user;
  } else {
    res.sendStatus(400);
  }

  next();
})
</pre></code>
