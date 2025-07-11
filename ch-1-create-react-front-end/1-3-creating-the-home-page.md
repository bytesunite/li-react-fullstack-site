# Chapter 1 - Creating a React Front-End
## Lesson 3 - Creating the Home Page

With a React app up and running, the next step is to create the pages for the website.

First, create a folder "pages" in the project's "src" folder to store the components for a website pages.

Now we can create components for each page.

[src/pages/HomePage.jsx]
<pre><code>
export default function HomePage(){
&nbsp;&nbsp;return (
&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1>This is the Home Page!&lt;/h1>
&nbsp;&nbsp;);
}
</code></pre>

But right now the Home Page will not be rendered because right now the App component is being rendered. If you navigate to "src/main.jsx" you will see that a DOM request grabs a div with the id of "root" and renders the "App" component.

So instead of replacing the App component, we can import our HomePage component into the App component, then specify it as the return value. To do this, replace all the boilerplate code.

[App.jsx]
<pre><code>
import './App.css'
import HomePage from './pages/AboutPage.jsx';

function App() {
&nbsp;&nbsp;return &lt;HomePage />
}

export default App
</code></pre>

So if all went well, you should now see the HomePage displayed instead of Vite's default page. It should be a single heading that says "This is the Home Page!".

But we will want to have multiple pages, such as an About page, Articles page, etc. So when we go to routes "/about", or "/articles" a different page is displayed. To do this we need to create a React router to serve individual routes. This is discussed in the next lesson.