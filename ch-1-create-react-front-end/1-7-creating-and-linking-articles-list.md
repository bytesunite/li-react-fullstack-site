# Chapter 1 - Creating a React Front-End
## Lesson 7 - Creating and Linking the Articles List

In the last lesson we learning how to use url parameters to gain access to part of the url and use this value to match an article and display it in the ArticlePage component. 

However, we had to manually type in the url and we still need to display the articles on the ArticlesList page. Then next step is to find solutions to both of these problems.

The goal is to create a list of articles & display a quick summary for each article on the ArticlesListPage. You should also be able to click on one of the articles to display the full article in the ArticlePage component.

To do this you will import the *Link* component from *react-router-dom* so we make each article "clickable" and navigate to the ArticlePage.<br>
We will import the articles and loop through them, displaying a title & a short summary of each article.<br>
The value of the Link's "to" prop will be the relative url for the article using the article's "name" property. JavaScript's substring() String method will limit the article content to 150 characters using the first paragraph in the array of content.

[src/pages/ArticlesListPage.jsx]
<pre><code>
import { Link } from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlesListPage(){
  return (
    &lt;>
      &lt;h1>Articles&lt;/h1>
      {articles.map(a => (
        &lt;Link key={a.name} to={`/articles/${a.name}`} >
          &lt;h3>{a.title}&lt;/h3>
          &lt;p>{a.content[0].substring(0, 150)}&lt;/p>
        &lt;/Link>
      ))}
    &lt;/>
  );
}
</code></pre>

After updating the ArticlesListPage, check the results in the browser by navigating to "http://locahost:5173/articles" and clicking on an article. It should load the full article in the ArticlePage component.

If everything went well it is time to move on.

This functionality of listing articles could be used on more than one page so consider refactoring it by creating a new component "ArticlesList". This component will take a list of articles as a prop.
You can then copy the logic from "src/pages/ArticlesListPage.jsx" to loop through the articles and paste it into a fragment element in the component's return statement. And finally we need to import the Link component that is used for each article.

[src/ArticlesList.jsx]
<pre><code>
export default function ArticlesList({articles}){
  return (
    &lt;>
      {articles.map(a => (
        &lt;Link to={`/articles/${a.name}`} key={a.name}>
          &lt;h3>{a.title}&lt;/h3>
          &lt;p>{a.content[0].substring(0, 150)}&lt;/p>
        &lt;/Link>
      ))}
    &lt;/>
  );
}
</code></pre>


With this new component in place we can circle back to the "src/pages/ArticlesListPage.jsx" component and remove the Link import, and replace the map() logic by importing our refactored ArticlesList component and using it.

[src/pages/ArticlesListsPage.jsx]
<pre><code>
import articles from '../article-content.js';
import ArticlesList from '../ArticlesList.jsx';

export default function ArticlesListPage(){
  return (
    &lt;>
      &lt;h1>Articles&lt;/h1>
      &lt;ArticlesList articles={articles} />
    &lt;/>
  );
}
</code></pre>


If everything was successful your app should work the same as it did before the component was refactored.
