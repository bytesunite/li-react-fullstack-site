import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import articles from '../article-content.js';
import CommentsList from '../CommentsList.jsx';

export default function ArticlePage(){
  const {name} = useParams();
  const { upvotes, comments } = useLoaderData();

  const article = articles.find(a => a.name === name);

  const errorMessage = "Article Not Found";

  return (
      <>
        <h1>{article ? article.title : errorMessage}</h1>
        <p>This article has {upvotes} upvotes!</p>
        {article && article.content.map(p => <p key={p}>{p}</p>)}
        <CommentsList comments={comments} />
      </>
  );
}

export async function loader({ params }){
  const response = await axios.get('/api/articles/' + params.name);
  const {upvotes, comments} = response.data;
  return {upvotes, comments};
}