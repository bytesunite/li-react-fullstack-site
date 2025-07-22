# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 4 - Using Route Parameters in Loaders

In the last lesson we hard coded a path to the "learn-node" article to grab the upvotes. But this will <span style="color:red;">break</span> all other articles upvotes data because it's using "learn-node" upvotes.

To fix this we need to take the url parameter and be able to pass it to the *loader* function. This is pretty simple. To do this you create a parameter for the loader function. React will automatically pass the parameters to the loader function.<br>

"front-end/src/App.jsx"<br>
<pre><code>
...
  path: '/articles/:name',
  element: &lt;ArticlePage />,
  loader: async function( { params }) {
    const response = await axios.get('/api/articles/' + params.name);
    const { upvotes, comments } = response.data;
    return { upvotes, comments }; 
  }
...
</code></pre>

To test this out you could open Postman or the Mongo Shell and verify upvotes for different articles before testing this in a browser. For example, start the database and use mongosh. Your content may be different but you can confirm how many upvotes exist in the database before testing it in a browser. You could use `db.articles.find({})` to display all details about the articles, or you can use the `forEach()` method to print only the article name and upvotes.<br>

<pre>
/$ mongosh
test> use 'react-full-stack-db'
switched to db 'react-full-stack-db'
react-full-stack-db> db.articles.find({}).forEach(function(article){ print(article.name, article.upvotes) })
learn-node 0
learn-react 1
mongodb 0
react-full-stack-db> exit()
/$
</pre>

Or, you could simply start the database, express server, and front-end server and navigate to "http://localhost:5173/articles" and click on different articles to see the upvotes value change. Go to the Network tab, click "Fetch/XHR", click on the article name, and click the "Response" tab to view details of the response.

If they remain the same either you did not update App.jsx correctly or the database has the same upvotes value for each article. You can use the Browser Dev Tools to explore. 

Now we can clean up our code by putting the loader functions directly in the components. For example we can cut the loader function from App.jsx and put it into the ArticlePage component.

"front-end/src/pages/ArticlePage.jsx"<br>
<pre><code>
...
import axios from 'axios';
...
export default ArticlePage(){
...
}

export async loader({ params }){
  const response = await axios.get('/api/articles/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}
</code></pre>

Then back in App.jsx we can import it, give it an alias, and provide this as the value for the "loader" property. You can also remove the import of axios because that was moved to the ArticlePage component.

"front-end/src/App.jsx"<br>
<pre><code>
...
import ArticlePage, {loader as articleLoader} from './pages/ArticlePage.jsx';
...
{
  path: '/articles/:name',
  element: &lt;ArticlePage />,
  loader: articleLoader
}
</code></pre>


Go ahead and test this out in a browser to make sure it is still working. Check the Browser Dev Tools to make sure you are getting the correct information for the article upvotes value.

With this loader working the next lesson will start looking at how to load comments and display them.
