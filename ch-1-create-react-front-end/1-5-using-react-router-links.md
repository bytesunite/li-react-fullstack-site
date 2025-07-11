# Chapter 1 - Creating a React Front-End
## Lesson 5 - Using React Router Links

In the last lesson we created 4 pages and used react-router-dom to allow us to navigate between them when typing in a url to render the component associated with that url. 

But how do we navigate between pages without typing in a specific url? You might think using an anchor tag &lt;a> would do the trick, but this tag is meant to make a http request for a new page. React is known for creating a "Single Page Application"(SPA) which updates the contents on the page without requesting a new page to improve performance. The solution is provided below.

So let's create a navigation bar with buttons to click to individual pages.

Inside the "src" directory create a new component "NavBar.jsx". You start off by creating a simple &lt;nav> with an unordered list of links for 3 of the 4 pages your created (Home, About, Articles). The Article page will be for an individual article within the Articles page so we will leave that for later.<br>
Then, import the *Link* component from react-router-dom to provide the ability to wire the linking capability to our router. This component uses a "to" property to specify the url, as a relative path, to give to the react router.

[src/NavBar.js]
<pre><code>
import {Link} from 'react-router-dom';

export default function NavBar(){
  return (
    &lt;nav>
      &lt;ul>
        &lt;li>&lt;Link to='/'>Home&lt;/Link>&lt;/li>
        &lt;li>&lt;Link to='/about'>About&lt;/Link>&lt;/li>
        &lt;li>&lt;Link to='/articles'>Articles&lt;/Link>&lt;/li>
      &lt;/ul>
    &lt;/nav>
  );
}
</code></pre>

Now trick becomes how to use the NavBar component. It is possible to import the NavBar into each page, that would work, but we would be repeating ourselves.<br>
For example, importing and using it in each page (HomePage, AboutPage, ArticlesListPage) would look like this:<br>
<pre><code>
import NavBar from '../NavBar.jsx';

export default function HomePage(){
  return (
    &lt;>
      &lt;NavBar/>
      &lt;h1>This is the Home Page!&lt;/h1>
    &lt;/>
  );
}
</code></pre>

The problem with duplicating code like this is when the layout changes, updates would have to be made to multiple/many individual component pages instead of a single layout component.<br>
A better solution is to create a sort of template that will display the NavBar on every page and only replace a section of the template with the correct page content.

You might think you could simply place the NavBar component in "App.js" such as the following. Unfortunately nothing will be rendered. If you do this you can look at the console and see errors. On of the errors is saying "useHref() may be used only in the context of a &lt;Router> component". The error is telling us that we cannot use the &lt;Link> component outside of the &lt;RouterProvider> defined in "App.js".

This will FAIL. Your app will render a blank page (Link can't be defined outside of RouterProvider)

[App.jsx] Fails!<br>
<pre><code>
...
import NavBar from '../Navbar.jsx';
...
return (
  &lt;>
    &lt;NavBar />
    &lt;RouterProvider router={router} />  
  &lt;/>
)
...
</code></pre>


Instead, create a Layout component that will be used as a template.
The *Outlet* component from react-router-dom acts as a placeholder for content. React router will render a component for a given route at this spot in the layout. But this alone won't work, the routes have to be updated to use the Layout component.

[App.jsx]<br>
<pre><code>
import {Outlet} from 'react-router-dom';
import NavBar from './NavBar.jsx';

export default function Layout(){
  return (
    &lt;>
      &lt;Navbar />
      &lt;Outlet />
    &lt;/>
  );
}
</code></pre>

Next, "App.jsx" needs to import the Layout component and modify the routes to make use it. The different with the routes is there is now a single route object and the existing routes are added to a property "children" of the first route.<br>
The end result is that Layout will display the NavBar on each page. The Outlet tag in Layout component will be replaced with the content of each page component based on the current url. So if the url is "/about" the Layout component will render the NavBar and replace Outlet with the AboutPage component.<br>
The only return value from "App.jsx" is the RouterProvider tag.

[App.jsx]
<pre><code>
...
import Layout from './Layout.jsx';
...

const routes = [
  {
    path: '/',
    element: &lt;Layout />,
    children: [
      {
        path: '/',
        element: &lt;HomePage />,
      },
      ...rest of the routes go here...
    ]
  }
];
...
return &lt;RouterProvider router={router} />
</code></pre>


Go ahead and start up the dev server and try it out. The navigation bar is not the prettiest but is should be functional and allow you to navigate between (Home, About, Artilces) pages.

If you run into problems here are a few things to help you. (also check the browser console for errors)
- double check the spelling of your components
- double check the nested syntax of your routes object
- make sure your a component imports all the necessary components

If everything is working, congrats. Let's move on.

Finally, the instructor follows up with the question raised at the start of the chapter, which was why can't you just use an anchor tag &lt;a> for links. React are generally "Single Page Applications (SPA)" and even though it looks like our app has different pages, it is just JavaScript swapping out the content via the browser DOM without a page refresh. Because of SPA, there is no need to contact the server in many cases. On the other hand, an anchor tag makes a request to the server for another page and refreshes the page. The &lt;Link> tag provided by **react-router-dom** is just JavaScript swapping out content, it does not make a request to the server.

So far we have only created addressed 3 of 4 pages. The navigation does not have a link to the Article page. In the next lesson you will learn how to link to and display the Article page to display a single unique article.
