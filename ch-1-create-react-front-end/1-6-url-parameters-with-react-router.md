# Chapter 1 - Creating a Rect Front-End
## URL Parameters With React Router

The navigation bar can open the pages (HomePage, AboutPage, & ArticlesListPage) but we need to be able to use the ArticlePage to display unique articles that are opened from the ArticlesListPage.

To do this we need to modify our routes to accept a url where part of the url is dynamic rather than a static. In other words, we want to be able to handle routes "/articles/1", "articles/2", etc. without having to hard code each and every possible path.<br>

To specify this behavior to React router we use a ":" character, followed by the name we want to use to access part of the url, such as "/articles/:name". Here "name" will be used to access part of the url following "/articles/". This is known as a "url parameter" or "route parameter".

In your routes, the element specified for "/articles/:name" will be rendered for all paths matching the pattern. Meaning if the element is &lt;Article> it will be rendered for "/articles/1", "/articles/2", etc.<br>
But you will also be able to access (1, 2, etc.) using the url parameter identifier (here it is "name") to determine what the Article component will render.

First, modify your routes in "App.jsx" to use a url parameter named ":name".

[src/App.jsx]
<pre><code>
...
routes = [
  {
    ...
    children: [
      ...
      {
        path: '/articles/:name',
        element: &lt;Article />,
      }
    ]
  }
];
...
</code></pre>


Before we use this url parameter, it would help to have some data to display such as a collection of articles. Create a new file "src/article-content.js" and copy the information from the instructor's repository. It is an array of objects that include "name, title, & content" properties.

You can find this file at the following repository: 
[article-content.js](https://github.com/LinkedInLearning/react-creating-and-hosting-a-full-stack-site-5948186/blob/02_06_end/front-end/src/article-content.js)

Then, inside the Article component we will need access to the url parameter value with help of the *useParams()* Hook provided by *react-router-dom*.<br>
The end result is this returns an object with properties associated with the url parameters. Below object destructuring grabs the url parameter "name".<br>
To test this out we can simply display the value passed as the url parameter in the heading.

[src/pages/ArticlePage.jsx]
<pre><code>
import {useParams} from 'react-router-dom';

export default function ArticlePage(){
  const {name} = useParams();

  return &lt;h1>This is the {name} article&lt;/h1>
}
</code></pre>

Start the dev server and type in a few urls to make sure the article page heading changes to match the url parameter value.
<pre>
http://localhost:5173/articles/learn-react
should display: "This is the learn-react article"

http://localhost:5173/articles/blah
should display: "This is the blah article"
</pre>

The url parameter value can be used in the Article component to match a specific article and display it. Import the "article-content.js" file we created earlier. This will be used as a collection we can search to match with a url parameter value with an article.

[src/pages/ArticlePage.jsx]
<pre><code>
import {useParams} from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlePage(){
  const {name} = useParams();

  const article = articles.find(a => a.name === name);

  return (
    &lt;>
      &lt;h1>{article.title}&lt;/h1>
      {article.content.map(p => &lt;p key={article.p}>{p}&lt;/p>)}
    &lt;/>
  );
}
</code></pre>


If you go back to the browser you may find an error because the url is "/articles/blah" and there is not article by that name. But you you type in a valid name such as "/articles/learn-react" it will display the title and text.

The instructor does not provide an error checking in this example. In a later lesson the 404 page is discussed. However, you could introduce your own graceful error handling to display a message such as "Error: Article Not Found" if the url parameter value does not match an article. You could also introduce semantic HTML to identify this as an article rather than a nondescript page. For example:

[src/pages/ArticlePage.jsx]
<pre><code>
import {useParams} from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlePage(){
  const {name} = useParams();

  const article = articles.find(a => a.name === name);

  const errorMessage = 'Error: Article Not Found'; 

  return (
    &lt;article>
      &lt;h1>{article ? article.title : errorMessage}&lt;/h1>
      {article && article.content.map(p => &lt;p key={article.p}>{p}&lt;/p>)}
    &lt;/article>
  );
}
</code></pre>
