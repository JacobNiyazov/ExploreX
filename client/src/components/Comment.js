import React from 'react';
import { StyledComment } from './StyleSheets/CommentStyles';

const Comment = ({ commentAuthor, comment }) => {
  return (
    <StyledComment>
      <p><strong>{commentAuthor}</strong></p>
      <p>{comment}</p>
    </StyledComment>
  );
};

export default Comment;
