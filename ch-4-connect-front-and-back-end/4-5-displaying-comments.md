# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 5 - Displaying comments

In the last lesson we learned how to use the "loader" property of React Router to provide a function to make http requests for data for the article upvotes. We also learned how to configure Vite to setup a proxy to forward requests from one domain/port to another.

This lesson starts off by creating a new component named *CommentsList*, to handle article comments.

<span style="font-size:smaller;color:gray;">front-end/src/CommentsList.jsx</span><br>
<pre><code>export default function CommentsList({ comments }){
  return (
    &lt;>
      &lt;h3>Comments&lt;/h3>
      {comments.map(comment => (
        &lt;div key={comment.text}>
          &lt;h4>{comment.postedBy}&lt;/h4>
          &lt;p>{comment.text}&lt;/p>
        &lt;/div>
      ))}
    &lt;/>
  );
}
</code></pre>


Then import *CommentsList* into the *ArticlePage* component.

<span style="font-size:smaller;color:gray;">front-end/src/pages/ArticlePage.jsx</span><br>
<pre><code>...
import CommentsList from '.../CommentsList.jsx';
...
return (
  ...
  &lt;CommentsList articles={articles}/>
)
</code></pre>


Now start up your database, express server, and front end server and test it out. Go to "http://localhost:5173/articles" and click on the individual articles to see if they have comments. If you want to add additional comments to an article you can open Postman and add comments as discussed in chapter 3-5, or use the Mongo Shell.

If all went well you should see just a header of "Comments" under the article text for "mongodb" & "learn-node", and see both a header "Comments" and a comment from "Shaun" & text "Great article" for the "learn-react" article.

The styling is boring and simple but app should work & display article comments. The instructor suggests if you want to add styling to feel free to do so.

NOTE: If you don't have any article comments or want to add more, see chapter 3-5 for an example of how to use Postman to add comments to articles.
