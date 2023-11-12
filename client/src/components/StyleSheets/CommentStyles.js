// CommentStyles.js
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

export const StyledComment = styled(Paper)(({ theme }) => ({
  padding: '16px',
  margin: '10px 0',
  backgroundColor: '#212121',
  borderRadius: 35,
}));

export const StyledCommentList = styled(Box)({
  maxHeight: '400px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#FF76D6',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#FF76D6',
    },
  },
  // Styles for Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: '#FF76D6 rgba(0,0,0,0.3)',
});

export const StyledCommentForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& textarea': {
    color: 'white',
    fontSize: '1.05rem',
    resize: 'vertical',
    padding: '8px',
    marginBottom: '8px',
    marginTop: '12px',
    backgroundColor: '#333', // Dark background for the textarea
    border: 'none',
    borderRadius: '4px',
  },
  '& button': {
    fontSize: '1.05rem', // Larger font size for button text
    padding: '8px',
    backgroundColor: '#FF76D6', // Pink background for the button
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ff24bd',
    },
  },
}));

