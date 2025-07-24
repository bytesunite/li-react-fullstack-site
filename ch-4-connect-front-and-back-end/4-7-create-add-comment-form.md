# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 7 - Creating an Add Comment Form

In the last lesson we created a button to increment upvotes. This lesson will finish up connecting the front and back end by creating a form to submit new comments.

Create a new component named "AddCommentForm" to provide the interface for the form. This component will have a single prop, named "onAddComment", that receives a function responsible for handling the form submission.

<span style="color:gray;font-size:smaller;">front-end/src/AddCommentForm.jsx</span><br>
<pre><code>import { useState } from 'react';

export default function AddCommentForm({onAddComment}) {
  const [nameText, setNameText] = useState('');
  const [commentText, setCommentText] = useState('');

  return (
    &lt;div>
      &lt;h3>Add a Comment&lt;/h3>
      &lt;label>
        Name:
        &lt;input 
          type="text" 
          value={nameText} 
          onChange={e => setNameText(e.target.value)}
        />
      &lt;/label>
      &lt;label>
        Comment:
        &lt;input 
          type="text" 
          value={commentText} 
          onChange={e => setCommentText(e.target.value)}
        />
      &lt;/label>
      &lt;button 
        onClick={()=> onAddComment({nameText, commentText})}
      >
        Add Comment
      &lt;/button>
    &lt;/div>
  );
}
</code></pre>

Now we can go to the *ArticlePage* component to insert the form and create the function.
1. import *AddCommentForm*
2. insert the *&lt;AddCommentForm onAddComment={onAddComment} />* element above the *CommentsList* element 
3. rename the value returned by the *useLoaderData()* hook to "initialComments". `const {upvotes : initialUpvotes, comments: initialComments } = useLoaderData();`
5. create a new state variable to hold comments and initialize it with *initialComments*. `const [comments, setComments] = useState(initialComments);`
6. create the *onAddComment* function to handle the submission and provide two parameters for the name & text of the comment.

<span style="color:gray;font-size:smaller;">front-end/src/pages/ArticlePage.jsx</span><br>
<pre><code>...
import AddCommentForm from '../AddCommentForm.jsx';
...
export default function ArticlePage() {
  ...
  const { upvotes : initialUpvotes, comments : initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments); 
  ...
  async function onAddComment({nameText, commentText}) {
    const response = await axios.post('/api/articles/' + name + '/comments', {
      postedBy: nameText,
      text: commentText,
    });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }
  ...
  return (
    ...
    &lt;AddCommentForm onAddComment={onAddComment} />
    &lt;CommentList comments={comments} />
  )
}
</code></pre>


With all those changes, let's try it out. The form isn't the prettiest but functional. Go to the "learn-react" article and fill out the form and click the "Add Comment" button. For example, enter "Shaun2" and "I agree, this is a wonderful article", then press the *Add Comment* button.<br>
<pre>
Name: Shaun2     Comment: I agree, this is a wonderful article   <span style="background-color:gray;border:1px solid black;border-radius:0.5rem;padding:0.2rem;">Add Comment</span>
</pre>

If all went well the comments on the page will be updated on the page, including the new comment.<br>
<pre><samp>...
Comments:
Shaun
Great article

Shaun2
I agree, this is a wonderful article
</samp></pre>

TROUBLESHOOTING (not part of course):<br>
If the app breaks, double check your handler function in *ArticlePage* and how you are invoking it in *AddCommentForm*. Make sure you are providing the arguments the same way. For example, the instructor uses `{nameText, commentText}` as an argument to *onAddComment* in ArticlePage, rather than `nameText, commentText`. This same format is used in the AddCommentForm by calling `onAddComment({nameText, commentText}` rather than separate parameters. 

If you don't pay attention you may end up messing up the mongodb database such as inserting a nested object. If you messed up your mongodb database you can always update or remove documents. For example, if you want to reset the comments array to an empty array, you can run the following command in the Mongo Shell:<br>
<pre><code>/$ mongosh
test> use full-stack-react-db
full-stack-react-db> db.articles.updateOne({name: 'learn-react'}, { $set: {comments: []}})
</code></pre>
END TROUBLESHOOTING (not part of course)

If your full stack app is working correctly, congrats.<br>
Another thing we might want to do is clear out the input fields after submitting a new comment. This would leave an empty field for a new comment. To do this, go back to the *AddCommentForm* component and modify the *onClick* handler function for the button.

<span style="color:gray;font-size:smaller;">front-end/src/AddCommentForm.jsx</span><br>
<pre><code>...
&lt;button onClick={() => {
  onAddComment({nameText, commentText});
  setNameText('');
  setCommentText('');
}}
</code></pre>

Now go back and refesh the page and type in "Someone else" & "I like it too" into the form and click the "Add Comment" button. You should see the new comment added but this time the fields are cleared after clicking the button.

Congrats! You now have a fully functional full stack React app.

The next couple chapters introduce Authentication and discuss how to Host the website.
