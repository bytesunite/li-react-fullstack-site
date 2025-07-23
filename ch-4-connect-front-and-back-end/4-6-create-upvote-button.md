# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 6 - Creating an Upvote Button

Now that we can make a request for data, the next step is to make a request to update data such as increment upvotes.

Next we will create a button to increment an article's upvote value with help of axios.
1. Create a button on the *ArticlePage* with a value of "Upvote"
2. Add an *onClick* prop to the button and provide a handler function named "onUpvoteClicked"
3. rename the variable returned from the *useLoaderData* hook to "initialUpvotes" to prevent name conflicts. `const { upvotes : initialUpvotes, comments } = useLoaderData();`
4. import the *useState* hook. After the call to the *useLoaderData* hook, create a new state variable named "upvotes" with a setter "setUpvotes" and initialize it with "initialUpvotes". `const [upvotes, setUpvotes] = useState[initialUpvotes];`
5. make sure the paragraph displaying upvotes uses the new state variable. `&lt;p>This article has {upvotes} upvotes!&lt;/p>`
6.  create the handler function, "onUpvoteClicked" for the button click within the component function. This function will make an axios.post request and use the returned data to call the state setter `setUpvotes()` to update the upvotes state variable.


<span style="color:gray;font-size:smaller;">front-end/src/pages/ArticlePage.jsx</span><br>
<pre><code>import { useState } from 'react';
...
const { upvotes : initialUpvotes, comments } = useLoaderData();
const [upvotes, setUpvotes] = useState(initialUpvotes);
...

export default function ArticlePage() {
  ...
  async function onUpvoteClicked() {
    const response = await axios.post('/api/articles/' + name + '/upvote');
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  return (
    ...
    &lt;h1>{article.title}&lt;/h1>
    &lt;button onClick={onUpvoteClicked}>Upvote&lt;/button>
    ...
  )
}
...
</code></pre>

If all went well, a new button is displayed on the article page. When you click the "Upvote" button you should see the page updates the upvote count. When you refresh the page this updated upvotes value should remain.

The next lesson uses axios to implementing adding new comments.
