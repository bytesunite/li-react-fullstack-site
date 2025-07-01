import { useParams } from 'react-router-dom';
import articles from '../article-content.js';

export default function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);

  return (
    <>
      <h1>{!article ? 'Article not found' : article.title}</h1>
      {article && article.content.map(p => <p key={p}>{p}</p>)}
    </>
  );
}