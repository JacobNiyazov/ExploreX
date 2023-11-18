import React from 'react';
import { StyledComment } from './StyleSheets/CommentStyles';

const Comment = ({ comment }) => {
  return (
    <StyledComment>
      <p><strong>{comment.authorUsername}</strong></p>
      <p>{comment.comment}</p>
    </StyledComment>
  );
};

export default Comment;
