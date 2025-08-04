# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 10 - Protecting the Upvote and Comment Endpoints

Currently anyone can upvote as many times as they want. A better solution is to limit this to a single upvote.

To do this, we can try to access the user via the request header "user". This is made possible by the middleware we created in the last lesson to use Firebase Admin to verify a user and if it is valid add it as part of the request.

back-end/src/server.js
<pre><code>...
app.post('/api/articles/:name/upvote', async (req, res) => {
  const {name} = req.params;

  const updatedArticle = await db.collection('articles').findOneAndUpdate( { name }, { 
    $inc: {upvotes: 1} 
  }, {
    returnDocument: "after"
  });
  
  res.json(updatedArticle);
});
</code></pre>

Right now our code simply increments a property "upvotes" on an article document in a MongoDB database. It has been awhile since we looked at the database so let's refresh our memory. Each article document in MongoDB looks like the following:

<pre>
{
  _id: ObjectId('2392389238920jndfd80'),
  name: 'learn-react',
  upvotes: 2
  comments: [
    {postedBy: 'Shaun', text: 'Great article'}
  ]
}
</pre>

As you can see, "upvotes" is a single property. There is no way to know *who* made the upvote. To help track "who" upvoted an article & how many total upvotes, we can use an array of user ids. For example: `upvoteIds: [user1, user2, user3]`. If the current logged in user id is in this array they have already upvoted and can't do it again. The total number of upvotes can be counted by the length of the array.

back-end/src/server.js
<pre><code>...
app.use(...); // require a user being logged in

app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection('articles').findOne({ name });

  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.include(uid);

  if(canUpvote){
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
      $inc: { upvotes: 1},
      $push: { upvoteIds: uid },
    }, {
      returnDocument: "after",
    });
  } else {
    res.sendStatus(403);  // not authorized
  }

  res.json(updatedArticle);
})
</code></pre>

Ok that should update the code to make sure only logged in users can upvote & only do it ONCE per article.

But we are not done. We still need to update the client-side making the request. We need to make sure a client side request is sending their authtoken along with requests. This is discussed in the next lesson.
