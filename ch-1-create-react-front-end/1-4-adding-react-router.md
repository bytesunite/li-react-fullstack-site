# Chapter 1 - Creating a React Front-End
## Lesson 4 - Adding React Router To An Application

In the last lesson we were able to display our HomePage component. But we want to be able to have multiple pages that respond to different routes. We want a url in the browser to display the webpage that is associated with that route.

One package "react-router-dom" is one package that does this routing for us. But we need to install it first.

If your server is still running in the terminal, press Ctrl + C.
In the terminal, from the project directory "front-end", use npm to install it.<br>
NOTE: Again, the instructor suggests you install the same version used in the instruction videos.

website/front-end/$ `npm install react-router-dom@6.4`

With this new package installed, modify App.jsx to add logic to generate routes. We can do this by 
1. importing "createBrowserRouter" & "RouterProvider" from "react-router-dom".
2. Creating routes with an array of objects that map a url path to a component that we want rendered. Each object will have properties "path" & "element".
3. Create what is called a "browser router" which is a function that creates routing from our routes array
4. Create a RouterProvider component that has a prop named "router" that we pass the results of the "browser router" in step 3.


[src/App.jsx]
<pre><code>
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

function App() {
  const routes = [
    {
      path: '/',
      element: &lt;HomePage/>,
    }
  ];

  const router = createBrowserRouter(routes);

  return &lt;RouterProvider router={router}/>
}

export default App
</code></pre>


Go ahead an save the modified file and start up the server again from your project directory.

website/front-end/$ `npm run dev`

If all went well you should see the same as before, the heading saying "This is the Home Page!". If you navigate to another url you should see a "Unhandled Thrown Error! 404 Not Found" page. This is the default behavior when a route is not found.

The next step is to create the other pages for our app and wire up the routes. In the "src/pages" folder create the additional components.

[pages/About.jsx]
[src/pages/AboutPage.jsx]
<pre><code>
export default function AboutPage(){
&nbsp;&nbsp;return (
&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1>This is the About Page!&lt;/h1>
&nbsp;&nbsp;);
}
</code></pre>

[src/pages/ArticlesListPage.jsx]
<pre><code>
export default function ArticlesListPage(){
&nbsp;&nbsp;return (
&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1>This is the Articles List Page!&lt;/h1>
&nbsp;&nbsp;);
}
</code></pre>

[src/pages/ArticlePage.jsx]
<pre><code>
export default function ArticlePage(){
&nbsp;&nbsp;return (
&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1>This is the Article Page!&lt;/h1>
&nbsp;&nbsp;);
}
</code></pre>


With all the new pages created, update "App.jsx" by importing all the pages and updating the routes. The Article page uses a placeholder path that will be dealt with later "articles/individual". 

[src/App.jsx]
<pre><code>
...
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArticlesListPage from './pages/ArticlesListPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';

function App() {
&nbsp;&nbsp;const routes = [
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: '/',
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;element: &lt;HomePage/>,
&nbsp;&nbsp;&nbsp;&nbsp;},
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: '/about',
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;element: &lt;AboutPage/>,
&nbsp;&nbsp;&nbsp;&nbsp;},
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: '/articles',
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;element: &lt;ArticlesListPage/>
&nbsp;&nbsp;&nbsp;&nbsp;},
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: '/articles/individual',
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;element: &lt;ArticlePage/>
&nbsp;&nbsp;&nbsp;&nbsp;},
  ];
...
  </code></pre>


So after all those changes, test out the individual routes to make sure each url is rendering the correct component.<br>
<pre>
https://localhost:5173/
should display the Home page

https://localhost:5173/about 
should display the About page

https://localhost:5173/articles   
should display the Articles list page

https://localhost:5173/artilces/individual 
should display the Article page
</pre>


If all the routes render the correct page, congrats, your are ready to continue with the next lesson.
