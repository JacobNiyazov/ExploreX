// CommentForm.js
import React, { useState, useContext } from 'react';
import { StyledCommentForm } from './StyleSheets/CommentStyles';
import { GlobalStoreContext } from '../store';
import { AuthContext } from '../auth'

const CommentForm = ({ map }) => {
  const [commentText, setCommentText] = useState('');
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const handleSubmit=(event)=> {
    event.preventDefault();
    let newComment = {
      authorUsername: auth.user.username,
      comment: commentText,
      timestamp: Date.now()
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
