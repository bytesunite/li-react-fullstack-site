# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 11 - Making Requests with Auth Tokens

Currently our backend is expecting an authtoken to be sent as part of the request. But our frontend is not doing this yet.

Remember, a custom hook was created back in lesson 5-7, to help us determine if a user is logged in. The hook makes a request to Firebase to verify a user is logged in. The hook determines if Firebase is still loading/thinking, and then returns the user once they are verified.

Open the Article page, import the custom `useUser` hook, and modify the code to grab the user and send the auth token with the request to the backend.<br>
Firebase provides the `getIdToken()' method to generate an ID token for the user.

- import the custom `useUser` hook from front-end/src/userUser.js
- inside the Article component function store the "isLoading" & "user" values returned from calling `userUser()`
- in the click handler "onUpvoteClicked" 
  1. check that the user exists and make a request for a token using Firebase method `getIdToken()`. 
  2. create a variable "header" that represent the header we want to send with the request. If a token is available create an object with the value. If there is no token, use an empty object.
  3. Update the axios.post method by passing the header variable along with the request. The second argument is null, which means we are not sending a request body. Then a third argument sends and object that contains our "header" object inside it. 



front-end/src/pages/ArticlePage.jsx
<pre><code>...
import useUser from '../useUser.js';

export default function ArticlePage(){

  const { isLoading, user } = useUser();

  const article = article.find(a => a.name === name);

  async function onUpvoteClicked() {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    const response = await axios.post('/api/articles/' + name + '/upvote', null, { headers });
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }
}
</code></pre>

So these modifications should now send an "authtoken" property and value as part of the request headers that our server will use. The server middleware will look for the "authtoken" property and use the value to help determine if the request has an authtoken and who the user is. 

Now we can do some of the same updates to the "onAddComment" handler function. The only real difference is we are sending a body with this request. So instead of null as the second argument we send the request body, then we send the headers as the third argument.

front-end/src/pages/ArticlePage.jsx
<pre><code>...
const onAddComment = async ({nameText, commentText}) => {
  const token = user && await user.getIdToken();
  const headers = token ? { authtoken: token } : {};
  const response = await axios.post('/api/articles/' + name + '/comments', {
    postedBy: nameText,
    text: commentText
  }, { headers });
  const updatedArticleData = response.data;
  setComments(updatedArticleData.comments);
};
</code></pre>


This should now send a token when attempting to submit a new comment. If a person is NOT logged in the comment should not be added to the database.

The other thing we can do is to hide features, like an upvote button, to visitors that are not logged in. So we can go down to the UI for the ArticlePage and wrap the upvote button and the comment form in a conditional based on whether a user exists.

front-end/src/pages/ArticlePage.jsx
<pre><code>return (
...
{user && &lt;button onClick={onUpvoteClicked}>Upvote&lt;/button>}
...
{user 
  ? &lt;AddCommentForm onAddComment={onAddComment} />
  : &lt;p>Log in to add a comment</p>}
&lt;CommentsList comments={comments} />
...
</code></pre>


*WARNING*:<br>
There is a a couple bugs in our sever we need to fix!
1. next() is in the wrong place, allowing non authenticated users to modify the db
2. A typo "include()" to find an item in an array should be "includes()"

Right now our middleware calls "next()" after our conditional. The problem is unauthorized users can still modify the database. Only when the user is authenticated should it continue with executing the endpoint such as updating the db.<br>
To fix this you will move the next() call inside the block where the user is verified. Alternatively you could have also provided a return statement when a user is not verified.

back-end/src/server.js (fixes unauthentication access: location of next)
<pre><code>...
app.use(async function(req, res, next) {
  const { authtoken } = req.headers;

  if(authtoken){
    const user = admin.auth().verifyIdToken(authtoken);
    req.user = user;
    <span style="color:green">next();</span>   // put it here!
  } else {
    res.sendStatus(400);
  }

  // WARNING: 
  // allows unauthenticated users to modify database
  // remove next() to fix this
  // <span style="color:red">next();</span>  
});
</code></pre>

back-end/src/server.js (snippet: fixes typo includes)
<pre><code>
app.post('/api/articles/:name/upvote', async (req, res) => {
  ...
  const canUpvote = uid && !article.upvoteIds.<span style="color:green">includes(uid);</span>
</code></pre>


So go ahead and try it out. First if you are logged in, you should see the the upvote button and the form to add a comment. Click the logout button. After this, the upvote button and comment form should be hidden.<br>
Next, while you are logged in, go to a specific article and click on the upvote button. It should increment. Open the network tab in dev tools, then click on the upvote button again. You should see the upvote will NOT increase, and a 403 response is returned in the network tab.<br>
Finally go ahead a go to an article and add a new comment. This should work as expected.
