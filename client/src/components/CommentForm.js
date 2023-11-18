// CommentForm.js
import React, { useState, useContext } from 'react';
import { StyledCommentForm } from './StyleSheets/CommentStyles';
import { GlobalStoreContext } from '../store';

const CommentForm = ({ map }) => {
  const [commentText, setCommentText] = useState('');
  const { store } = useContext(GlobalStoreContext);
  /*const handleSubmit = (event) => {
    event.preventDefault();
    // Replace with your actual API endpoint
    fetch(`/api/maps/${mapId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: commentText }),
    })
    .then(response => response.json())
    .then(() => {
      onCommentSubmit();
      setCommentText('');
    })
    .catch(error => console.error('Error posting comment:', error));
  };*/
  const handleSubmit=(event)=> {
    event.preventDefault();
    //the author name will change when i have auth
    let newComment = {
      _id: "3",
      authorUsername: "amelia",
      comment: commentText,
      timestamp: '2023-11-01T09:24:00.000Z'
    }
    store.updateMapReaction(map, map.reactions.likes, map.reactions.dislikes, true, newComment)
    setCommentText('');
  }

  return (
    <StyledCommentForm>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        required
        data-testid= 'comment-input'
      />
      <button type="submit" data-testid='submit-comment' onClick = {handleSubmit}>Post Comment</button>
    </StyledCommentForm>
  );
};

export default CommentForm;
