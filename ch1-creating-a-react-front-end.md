# LinkedIn Learning - React:Creating and Hosting a Full-Stack Site

Shaun Wassell is the instructor for this course


## Chapter 1 - Creating a React Front-End 

### Why React?
---
You might wonder why we would use [React](https://react.dev) to build the application instead of hand coding with HTML, CSS, and JavaScript.
The reason, is that React makes development easier and faster without taking away control from the programmer.
React has the benefit of creating modular reusable components to build the web application.

But why use React instead of other popular solutions such as Wordpress, Wix, SquareSpace which allows you to create a website without writing any code.
These solutions are recommended for non-developers.
This course is meant for developers that want to learn React.

### Setting up a React Project
The fastest way to create a new React app is using a **generator** such as [Vite](https://vite.dev/).

It is assumed you have **Node.js** installed which gives you access to **npm**. This course uses **Visual Studio Code** and a new terminal is opened to run the npm **create** command `npm create vite@5.5.2` to create a new React project named *front-end*.
The instructor uses Vite version 5.5.2, but for production it is suggested to use the latest version `npm create vite@latest`.


#### Using Vite ver 5.5.2 (for the latest use: vite@latest)
---
user/$ `npm create vite@5.5.2`

Ok to proceed? (Y) `y`<br>
\> npx<br>
\> create-vite

? Project Name: `front-end`<br>
? Select a framework:<br>
\> `React`<br>
? Select a variant:<br>
\> `JavaScript`

Scaffolding project ...

Done. Now run:<br>
&nbsp;&nbsp;&nbsp;&nbsp;cd front-end<br>
&nbsp;&nbsp;&nbsp;&nbsp;npm install<br>
&nbsp;&nbsp;&nbsp;&nbsp;npm run dev

user/$


After you follow the instructions to navigate to the project directory, install packages and start the server you can view the React app that Vite built for you at *http://localhost:5173/*
NOTE: The instructor is using CodeSpaces so it works a little different.

If you look at the directory structure that Vite created there is an *App.jsx* file that is the root component for your application. You can modify this file and save it to immediately see changes in the browser.
This immediate change after saving the file without needing to restart the server is known as "Hot Module Reloading".

`function App() {`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`return <h1>Hello React<\h1>;`<br>
`}`


### Creating the home page
---
With the React app scaffold created and the React app up and running lets get started. First, create a new folder *src/pages* and within that folder create a new file *HomePage.jsx* which will be used for our homepage.

[src/pages/HomePage.jsx]<br>
<pre><code>
export default function HomePage() {
    return &lt;h1>This is the Home Page!&lt;/h1>;
}
</code></pre>

If you look in *src/main.jsx* it uses JavaScript to grab an element from *index.html* and renders the *App* component. The *App* component is the main component for a React application. So let's try to render the *HomePage* component inside the *App* component. To do this open "src/App.jsx" and replace all the content following the *return* statement. Instead, after the return statement provide `<HomePage />`. This by itself will not work. We need to import the component before we can use it in the App component.

<pre><code>
import './App.css';
import HomePage from './pages/HomePage.jsx'

function App(){
  return &lt;HomePage>;
}

export default App;
</code></pre>


If all went well, your React app will now display large text saying *This is the Home Page!* in the middle of the page.

But this has limited use. We need to add individual routes to our app in order to display more than one page. When navigating to another page, the url should change and the other page should be displayed. For example, if we went to the url "/about" we would expect the About page to display.


### Adding React Router to an application
---
The next step is to write code so when visiting another url, the page associate with that url is displayed. This is called *routing*. *React Router* provides this functionality as a package named "react-router-dom". We need to install this package before we can use it.
NOTE: The instructor installs a specific version of react-router-dom  
and to prevent issues with his examples it is suggested to use the same version. Newer versions may have breaking changes and the example code may break.
For example the instructor is using 6.4, but when taking this course the most recent version was 7.6.3

user/$ `npm install -D react-router-dom@6.4`

Once React Router is installed we will 
- Import *createBrowserRouter* and *RouterProvider* from *react-router-dom* 
- Create an array of objects for routes in the web application.
  Each object will contain a "path" property for the url &
  an "element" property for the component we want to render at this path.
- Create additional component pages and import them into *App.jsx*


[pages/AboutPage.jsx]
<pre><code>
export default function AboutPage() {
  return &lt;h1>This is the About Page!&lt;/h1>;
}
</code></pre>

[App.jsx]
<pre><code>
import {
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const routes = [
  {
    path: '/',
    element: &lt;HomePage/>,
  },
  {
    path: '/about',
    element: &lt;AboutPage/>
  }
];

const router = createBrowserRouter(routes);

function App(){
  return &lt;RouterProvider router={router}/>;
}

export default App;
</code></pre>



If all went well, the same large text message for the homepage will display *This is the Home Page!*

If you type a known url, such a *http://localhost:5173/about*, you should see the About page rendered with the message *This is the About Page*

If you provide an unknown url, a 404 not found page is displayed with a message similar to **404 Not Found**.

With a successful homepage and about page, lets create other pages and add them to our router. The ArticlesPage component will show a list of articles, and the ArticlePage will display an individual article.

[pages/ArticlePage.jsx]
<pre><code>
export default function ArticlePage() {
  return &lt;h1>This is the Article Page!&lt;/h1>;
}
</code></pre>

[pages/ArticlesListPage.jsx]
<pre><code>
export default function ArticlesListPage() {
  return &lt;h1>This is the Articles List Page!&lt;/h1>;
}
</code></pre>


Then we need to import the components and update our routes. For now we will use a placeholder for the individual Article page. Later we learn how we can replace the "individual" part of the path with an id of a specific article.

[App.jsx]
<pre><code>
...
import ArticlesListPage from './pages/ArticlesListPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
...
const routes = [
  {
    path: '/',
    element: &lt;HomePage/>,
  },
  {
    path: '/about',
    element: &lt;AboutPage/>
  },
  {
    path: '/articles',
    element: &lt;ArticlesListPage/>
  },
  {
    path: '/articles/individual',
    element: &lt;ArticlePage/>
  }
];
</code></pre>


Go ahead and test these routes in your browser to view each page.
If all went well you should be able to visit each route:
- /
- /about
- /articles
- /articles/individual


### Using React Router Links
---
Right now we are manually typing in each route in the web browser so lets create links we can click to navigate from one page to another. First we will create a navbar, and second we will create a template to display this on every page.


Step one is to create a navbar letting us navigate between pages.
The &lt;Link> tag, provided by "react-router-dom", allows us to navigate between pages.
The **to** attribute specifies the route/url. 
A &lt;Link> differs from a traditional anchor &lt;a> in that an anchor tag's default behavior is making a server request for a new page. We don't want a new request, instead we want React to render new content on the current page. React apps are typically SPA so content is swapped out rather than request a new page and render it.

Create a NavBar component outside the "/pages" directory.

[src/NavBar.jsx]
<pre><code>
export default function NavBar() {
  return (
    &lt;nav>
      &lt;ul>
        &lt;li>
          &lt;Link to='/'>Home&lt;/Link>
        &lt;/li>
        &lt;li>
          &lt;Link to='/About'>About&lt;/Link>
        &lt;/li>
        &lt;li>
          &lt;Link to='/articles'>Articles&lt;/Link>
        &lt;/li>
      &lt;/ul>
    &lt;/nav>
  );
}
</code></pre>


Step 2 is to use a component as a template to display the navbar on every page, only changing the main content of the page.
Although you could repeat yourself and provide a navbar on each of your page components its not good practice & a maintenance issue (removing or moving the navbar would require you to do it on every page).

With the NavBar complete, go into the App component, import the NavBar component, and place the NavBar above the RouterProvide tag that inserts our individual page content.
NOTE: A Fragment tag is needed when returning multiple siblings from a component.

[src/App.jsx]
<pre><code>
...
import NavBar from './NavBar.jsx';
...
function App(){
...
  return (
    &lt;>
      &lt;NavBar />
      &lt;RouterProvider router={router} />
    &lt;/>
  );
}
</code></pre>


Fire up your development server and test it out.
It will NOT work!!! 

Troubleshoot by clicking on the page and "inspect" the document. Go to the "Console" tab to explore any error messages. You may get one or more errors.
For example, "Uncaught Error: useHref() may be used only in the context of a Router component".

So how do we fix this?
The problem is we can NOT use the &lt;Link> component outside of a &lt;RouterProvider component. Right now,
The NavBar component imports and uses &lt;Link.
The App component imports NavBar and attempts to place this element as a sibling to the &lt;RouterProvider> that we are returning from the App component.

To fix this we need to create a layout component that we can provide to the RouterProvider.
Inside of the "src" directory create a new component named "Layout.jsx".
Import the NavBar component.
And import the Outlet component from "react-router-dom". This tag will provide a placeholder of sorts (a space) for the RouterProvider to insert content from the pages we specified as elements for our routes.
NOTE: Outlet is imported as {Outlet} rather than how other local components
      are imported. If you get an error message where react-router-dom is
      complaining about about NavBar 'default' this is likely the reason.


[src/Layout.jsx]
<pre><code>
import NavBar from './NavBar.jsx'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    &lt;>
      &lt;NavBar />
      &lt;Outlet />
    &lt;/>
  )
}
</code></pre>



Now back in App.jsx you can remove the import for NavBar.
And instead we can import the Layout component.
Then we will modify our routes array.
The whole array of routes for the individual pages we created earlier will be added to a prop named "children" in a single route for our layout. The element for this single route will be &lt;NavBar /> and the path will be '/'.
Remove the &lt;NavBar component from the App return value, only returning the &lt;RouterProvider /> element.

<pre><code>
...
import Layout from './Layout.jsx';

function App() {
  const routes = [
    {
      path:'/',
      element: &lt;Layout />,
      children: [
        {
          path:'/',
          element:&lt;HomePage />
        },
        {
          path:'/about',
          element:&lt;About />
        },
        {
          path:'/articles',
          element:&lt;ArticlesListPage />
        },
        {
          path:'/articles/individual',
          element:&lt;ArticlePage />
        }
      ] 
    }
  ];

  const router = createBrowserRouter(routes);

  return &lt;RouterProvider router={router} />;
}
</code></pre>


Well that was fun. Go ahead and start the develpment server and try it again. This time it should work! Test it out by clicking on the navbar links and make sure you are seeing the right page and url.
Don't wory about the styling of the list of links, that can easily be cleaned up with a little CSS.

Everything looks pretty good but we skipped adding the Article page to our navbar. This is because we will show this page only when clicking on an article from the Articles page. This is discussed in the next lesson.


### URL Parameters with React Router
---
The navbar has links to the homepage, about page, and articles page.
However, we still need to handle the article page. Currently the article page has a route of "articles/individual" but we need to be able to provide a dynamic value in place of "individual".
To do this we make use of something called a *url parameter* or *route parameter*.
The syntax is to use a colon : followed by a name. This basically grabs whatever is after the colon as the value for the route.


NOTE: You can use any param name you want :name, :id, articleId, etc.
<pre><code>
  {
    path:'/articles/:name',
    element:&lt;ArticlePage/>,
  }
</code></pre>

By setting the ArticlePage route to "articles/:name" it will render the &lt;ArticlePage> element/component when the url has any value following "articles/", such as "articles/learn-node", "articles/learn-react", etc.
The route parameter name (here it is :name) is how you access the value in url from within your component. Inside ArticlePage you will use the value of the router parameter to find a single article in an array of articles and display it.

First, we need some articles. The instructor creates a file in the "src" directory named "article-content.js". The data for this file can be found in the GitHub repo.

GitHub Repository [article-content.js](https://github.com/LinkedInLearning/react-creating-and-hosting-a-full-stack-site-5948186/blob/01_09_start/front-end/src/article-content.js)

Each article object is made up of a few properties:
- name - This example uses what is called a SLUG, a shortened title meant for a url
- title - The article title
- content - An array of paragraphs for the article. In this example its just Lorem Ipsum text which is just dummy/garbage text.


Next, we learn how to grab the value from route parameter, from within the ArticlePage component. The *useParams()* hook is a function from react-router-dom that helps us with this task. We use this hook inside our component and since we used "name" we can destructure this from the value returned from useParams().

<pre><code>
import { useParams } from 'react-router-dom';

export default function ArticlePage() {
  const { name } = useParams();

  return (
    &lt;>
      &lt;h1>This is the {name} article&lt;/h1>
    &lt;/>
  )
}
</code></pre>


Go ahead and test this out by starting up the dev server and typing in a url such as "http://localhost:5173/articles/hello".  You should see the ArticlePage component rendered with the text "This is the hello article". 

The "article-content.js" file has names (learn-react, learn-node, and mongodb). The url parameters will attempt to match the name of a specific article to filter it out and display it with the ArticlePage component.

First, import the "article-content.js" file into the ArticlePage component.
Then filter the article by the url parameter value.
Finally, you will display the results. 
Optionally you can display a message if the article was not found or don't do anything and let an ugly error display. 
NOTE: The instructor does not attempt to catch errors for an invalid route parameter value.
      An Uncaught error is displayed and provides details of of your app components. 
      I decided to check for a valid article to address this.

<pre><code>
import { useParams } from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);

  return (
    &lt;>
      &lt;h1>
        {article ? name : 'Article not found'}
      &lt;/h1>
      {article && article.content.map(p => &lt;p key={p}>{p}&lt;/p>)}
    &lt;/>
  )
}
</code></pre>



### Creating and Linking the Articles List
---
Right now we can manually type in a url to render an individual article from a list of articles using a route parameter.
The next step is to build the interface for the ArticlesListPage where each item in the list is clickable, opening the individual article in ArticlePage.

- Import articles from the file "article-content.js" into ArticlesListPage.
- Update the page header to simply say "Articles".
- Loop through the article using map() and display the article title
  and provide the first 150 characters from the article content
- Make the article clickable with the Link component from 'react-router-dom'
  use the base of "/articles/" combined with the article name for the path.
  We also need a "key" property for each Link, and we will use the article name.

<pre><code>
import { Link } from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlesListPage() {
  return (
    &lt;>
      &lt;h1>Articles&lt;/h1>
      {articles.map(a => (
        &lt;Link key={a.name} to={'/articles/' + a.name}>
          &lt;h3>{a.title}&lt;/h3>
          &lt;p>{a.content[0].substring(0,150)}&lt;/p>
        &lt;/Link>
      ))}
    &lt;/>
  );
}
</code></pre>


Now, we can refactor our code to make this common behavior of listing articles to a separate component. This allows us to use the same functionality on other pages, such as inserting a portion of articles on the home page.

Create a new component *ArticlesList* in the "src" directory. This is not a page, it is more of a utility component so it is not in the "pages" directory.
Grab the map() portaion of ArticlesListPage and insert it into the ArticlesList.

[src/ArticlesList.jsx]
<pre><code>
import { Link } from 'react-router-dom';

export defaut ArticlesList({ articles }){
  return (
    &lt;>
      {articles.map(a => (
        &lt;Link key={a.name} to={'/articles/' + a.name}>
          &lt;h3>{a.title}&lt;/h3>
          &lt;p>{a.content[0].substring(0,150)}&lt;/p>
        &lt;/Link>
      ))}
    &lt;/>
  );
}
</code></pre>


Now, go back to the ArticlesListPage 
- Remove the Link import
- Import the ArticlesList component 
- Replace the map() we had earlier with the *ArticlesList* & pass articles as a prop.

[src/pages/ArticlesListPage.jsx]
<pre><code>
import articles from '../article-content.js';
import ArticlesList from '../ArticlesList.jsx';

export default function ArticlesListPage() {
  return (
    &lt;ArticlesList articles={articles} />
  );
}
</code></pre>


If all went well it should work the same as before.


### Creating a 404 page in React
---
The app has 4 routes (homepage, about, articles, article) but attempting to go to an invalid route/url will throw an Unhandled Error, displaying the default 404 not found page.

To make a more appealing page when the route can't be found, we can modify our routes and create a page that is displayed.
In the root route, where we are displaying the &lt;Layout> element, we can add another property named *errorElement* and provide a component we want to display when an error is detected.

[App.jsx]
<pre><code>
...
import NotFoundPage from './pages/NotFoundPage.jsx';
...
function App(){
  const routes = [
    {
      path:'/',
      element: &lt;HomePage />,
      errorElement: &lt;NotFoundPage />,
      children: [
        ...
      ]
    }
  ]
}
</code></pre>


[pages/NotFoundPage.jsx]
<pre><code>
export default function NotFoundPage() {
  return (
    <>
      &lt;h1>Page Not Found&lt;/h1>
      &lt;p>The link you followed to get here must be broken...&lt;/p>
    <>
  )
}
</code></pre>


Go ahead and start the dev server and navigate using the navbar and everything should work.
The, type in some urls that don't match any route (/blah, articles/hello), and you should see the error page.
NOTE: The instructor mentions you won't always want the error page for every route but fails to go into details of how and when to do this.


