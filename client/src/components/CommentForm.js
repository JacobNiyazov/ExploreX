// CommentForm.js
import React, { useState } from 'react';
import { StyledCommentForm } from './StyleSheets/CommentStyles';

const CommentForm = ({ mapId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event) => {
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
  };

  return (
    <StyledCommentForm onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </StyledCommentForm>
  );
};

export default CommentForm;
