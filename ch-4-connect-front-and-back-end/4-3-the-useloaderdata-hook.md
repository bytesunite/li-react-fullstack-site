# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 3 - Using the useLoaderData Hook

In the last lesson we added a "loader" property and function to make a http request and return the data. We returned the *comments* & *upvotes* data.

To use the returned data in the element we provided for the route, we need help from the *useLoaderData* hook found in "react-router-dom". So open up the *ArticlePage* component and modify it as follows. It is pretty simple, calling useLoaderData() within the component will return the data. Since we returned {comments, upvotes} we can destructure it as follows:<br>

<span style="font-size:smaller;color:gray;">src/pages/ArticlePage.jsx</span><br>
<pre><code>import { useParams, useLoaderData } from 'react-router-dom';
import articles from '.../article-content.js';

export default function ArticlePage() {
  const { name } = useParams();
  const { upvotes, comments } = useLoaderData();

  const article = articles.find(a => a.name === name);

  return (
    &lt;>
      &lt;h1>{article.title}&lt;/h1>
      &lt;p>This article has {upvotes} upvotes!&lt;/p>
      {article.content.map(p => &lt;p key={p}>{p}&lt;/p>)}
    &lt;/>
  );
}
</code></pre>

With this is place, lets test it out. To test this we need to make sure the following parts are started:
1) make sure the mongodb server is running
2) make sure the express server is running
3) make sure the front end we created with Vite is running

Then go to the url "http://localhost:5173/articles/learn-node".

OOPS! our upvotes is NOT working.<br>
Open up the browser Dev Tools and navigate to the "Network" tab, then go to "Fetch/XHR". This will show us the requests made from our front end. You should see a request was made from App.jsx for "learn-node". Click on "learn-node" under the name and navigate to "Headers" to get information about the request.<br>
You will see a GET request was made to "http://localhost:5173/api/articles/learn-node". Pay special attention to the port "5173" in this request. Our backend is running on port 8000, not 5173.

As you may have guessed, when we specified the URL in "App.jsx" we did NOT specify the full url. Instead we provided a relative path "/api/articles/learn-node" & the server automatically assumed the current domain and port of "localhost:5173". This makes sense, how would it guess which port and domain we want without telling it.

What we need to do is create a "proxy".<br>
Since we created our React app with Vite, we can configure Vite's "vite.config.js" configuration file. We will modify the object provided to the defineConfig function.<br>
NOTE: If you are using Codespaces the url will be your specific Codespace url.

<span style="font-size:smaller;color:gray;">front-end/vite.config.js</span><br>
<pre><code>import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  }
})
</code></pre>

Save this file. Then restart your web server to make sure the changes are reflected.

If all went well you should see the upvotes are now displayed.

If you investigate the request again in the Browser Dev Tools, "Network:Fetch/XHR:learn-node:Headers", you will see the request is still made to port "5173". That might seem odd because the data is on our Express server running on port "8000". What is going on behind the scenes is that Vite is now forwarding requests starting with '/api' to that other target you specified in "vite.config.js" for a proxy. The instructor does not go into details of how this redirect works.

Remember, we hard coded a request to learn-node in "App.jsx" for the route "/articles/:name". For example, the *loader* function makes a request "axios.get('/api/articles/learn-node')". This means if you navigate to "http://localhost:5173/articles/learn-react" the article will display the Learn-React article, but the upvotes will be for "learn-node", NOT "learn-react". This will FIXED in the next lesson.
