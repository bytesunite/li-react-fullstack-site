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

If you look in *src/main.jsx* you will it uses JavaScript to grab an element from *index.html* and renders the *App* component. The *App* component is the main component for a React application. So let's try to render the *HomePage* component inside the *App* component. To do this open "src/App.jsx" and replace all the content following the *return* statement. Instead, after the return statement provide `<HomePage />`. This by itself will not work. We need to import the component before we can use it in the App component.

<pre><code>
import './App.css';
import HomePage from './pages/HomePage.jsx'

function App(){
  return &lt;HomePage>;
}

export default App;
</code></pre>


If all went well, your React app will now display large text saying *This is the Home Page!* in the middle of the page.

But this has limited use. We need to add *routing* to our app in order to display more than one page. When navigating to another page, the url should change an the other page should be displayed. For example, if we went to the url "/about" we would expect the About page to display.


### Adding React Router to an application
---
The next step is to write code so when visiting another url, the page associate with that url is displayed. This is called *routing*. *React Router* provides this functionality as a package named "react-router-dom". We need to install this package before we can use it.
NOTE: The instructor installs a specific version of react-router-dom  
and to prevent issues with his examples it is suggested to use the same version. Newer versions may have breaking changes and the example code may break.
For example the instructor is using 6.4, but when taking this course the most recent version was 7.6.3

user/$ `npm install -D react-router-dom@6.4`

Once React Router is installed we will 
- import *createBrowserRouter* and *RouterProvider* from *react-router-dom* 
- create an array of objects for routes in the web application.
  each object will contain a "path" property for the url &
  an "element" property for the component we want to render at this path.
- create additional component pages and import them into *App.jsx*


[pages/AboutPage.jsx]
<pre><code>
export default function AboutPage() {
  return <h1>This is the About Page!</h1>;
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

