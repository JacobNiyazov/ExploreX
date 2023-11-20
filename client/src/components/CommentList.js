import React from 'react';
import Comment from './Comment';
import { StyledCommentList } from './StyleSheets/CommentStyles';

const CommentList = ({ commentsList }) => {
  if (commentsList.length === 0) {
    return null;
  }
console.log("commentlist: ", commentsList)
  return (
    <StyledCommentList>
      {commentsList.map(comment => (
        <Comment key={comment._id} commentAuthor={comment.authorUsername} comment={comment.comment} />
      ))}
    </StyledCommentList>
  );
};

export default CommentList;
