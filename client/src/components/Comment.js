import React from 'react';
import { StyledComment } from './StyleSheets/CommentStyles';

const Comment = ({ comment }) => {
  return (
    <StyledComment>
      <p><strong>{comment.author}</strong></p>
      <p>{comment.text}</p>
    </StyledComment>
  );
};

export default Comment;
