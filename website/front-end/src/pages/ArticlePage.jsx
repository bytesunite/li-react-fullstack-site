import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import articles from '../article-content.js';
import CommentsList from '../CommentsList.jsx';
import AddCommentForm from '../AddCommentForm.jsx';
import useUser from '../useUser.js';

export default function ArticlePage(){
  const {name} = useParams();
  const errorMessage = "Article Not Found";
  const { upvotes : initialUpvotes, comments : initialComments} = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const { isLoading, user } = useUser();

  const article = articles.find(a => a.name === name);

  const onUpvoteClicked = async ()=> {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/articles/' + name + '/upvote', null, {headers});
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  };

  const onAddComment = async ({nameText, commentText}) => {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/articles/' + name + '/comments', {
      postedBy: nameText,
      text: commentText
    }, { headers });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  };

  return (
      <>
        <h1>{article ? article.title : errorMessage}</h1>
        <button onClick={onUpvoteClicked}>Upvote</button>
        <p>This article has {upvotes} upvotes!</p>
        {article && article.content.map(p => <p key={p}>{p}</p>)}
        <AddCommentForm onAddComment={onAddComment} />
        <CommentsList comments={comments} />
      </>
  );
}

export async function loader({ params }){
  const response = await axios.get('/api/articles/' + params.name);
  const {upvotes, comments} = response.data;
  return {upvotes, comments};
}