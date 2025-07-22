import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlePage(){
  const {name} = useParams();
  const { upvotes, comments } = useLoaderData();

  const article = articles.find(a => a.name === name);

  const errorMessage = "Article Not Found";

  return (
      <article>
        <h1>{article ? article.title : errorMessage}</h1>
        <p>This article has {upvotes} upvotes!</p>
        {article && article.content.map(p => <p key={p}>{p}</p>)}
      </article>
  );
}
