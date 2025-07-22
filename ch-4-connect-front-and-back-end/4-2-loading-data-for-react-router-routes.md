# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 2 - Loading Data for React Router Routes

We haven't looked at the front-end code for awhile so lets review it. Specifically, open up "front-end/src/App.jsx" and refresh your memory of the routes we setup. You will see we essentially specified a React component to render for different browser urls. For example, when we visit the homepage at "http://localhost:8000/" the router will render the *Layout* component that acts as a template, and it inserts the *HomePage* component inside it.<br>

"front-end/src/App.jsx"<br>
<pre><code>
...
const routes = [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <HomePage/>,
        },
        {
          path: '/about',
          element: <AboutPage/>,
        },
        {
          path: '/articles',
          element: <ArticlesListPage/>
        },
        {
          path: '/articles/:name',
          element: <ArticlePage/>
        }
      ]
    }
  ];
...
</code></pre>


To gather data from a server we can modify React router to use the "loader" property for a route. This property accepts a asynchronous function, which is resonsible for loading any data from the server. To demonstrate, let's look at how to grab data for a single article for the route '/articles/:name'. The tricky part about providing a url to *axios.get()* is that you will run into CORS errors. For example, a Fetch request is made from a.com to b.com.

**NOTE:**<br>
For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. CORS or "Cross-Origin Resource Sharing" is a mechanism to safely bypass the same-origin policy, which allows a web page to access resources from a server different than the one that served the webpage.<br>
[CORS explanation : Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)

So let's try to manually get the "learn-node" article from our front-end using *axios.get()* and see what happens. Later we will learn how to use a dynamic value for the article name.

<pre><code>
...
import axios from 'axios';
...
  path: '/articles/:name',
  element: <ArticlePage>,
  loader: async function() {
    const response = await axios.get()
    const {upvotes, comments} = response.data;
    return {upvotes, comments};
  }
...
</code></pre>

You might wonder why we are retuning data from the *loader* function and how this relates to the element *ArticlePage* for the route. The answer is the return data is made available in the component with a special hook, called *useLoaderData*.

The hook *useLoaderData* is discussed in the next lesson.
