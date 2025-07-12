# Chapter 1 - Creating a React Front-End
## Lesson 8 - Creating a 404 Page in React

Currently when an unkown route exists, an error page is displayed. A default component is provided by React Router that will display "Unhandled Error! 404 Not Found".

To create your own 404 page using React Router is fairly straight forward.

First, create a new page, "src/pages/NotFoundPage.jsx" that will render when a route is not found.

[src/pages/NotFoundPage.jsx]
<pre><code>
export default function NotFoundPage(){
  return (
    &lt;>
      &lt;h1>Page Not Found&lt;/h1>
      &lt;p>The link you followed to get here must be broken...&lt;/p>
    &lt;/>
  );
}
</code></pre>

Then, you can provide an "errorElement" property to your routes in "App.jsx" for the main route, which currently is the &lt;Layout> element. Import your NotFoundPage component apply it to the errorElement property.

[App.jsx]
<pre><code>
...
import NotFoundPage from './pages/NotFoundPage.jsx';
...
const routes = [
  {
    path: '/',
    element: &lt;Layout />,
    errorElement: &lt;NotFoundPage />,
    children: [
      ...
    ]
  }
];
...
</code></pre>

Now if you go to the browser and enter an unknown route it should display the custom error page. The default behavior is to render the same error page for ALL routes it can't find "/nope", "/articles/nope", etc. (unless you added the graceful error handling I suggested in the ArticlesListPage component)<br>
Take notice that the navigation bar is missing because instead of displaying the Layout component it is displaying the NotFoundPage component when a routing error is detected.
