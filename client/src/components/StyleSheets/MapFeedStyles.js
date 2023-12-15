import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledMapFeed = styled('div')({
  backgroundColor: '#505050',
  padding: '20px',
  width: '55%',  // Adjust width as needed
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '100vh',  // Full view height
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
  maxHeight: '80vh'
});

export const StyledCard = styled('div')({
  backgroundColor: 'black',
  color: '#FF76D6',
  marginBottom: '20px',
  padding: '10px',
  height: '275px',
});

export const TitleTypography = styled('div')({
  fontSize: '1.2rem',
  fontWeight: 'bold',
});

export const AuthorTypography = styled('div')({
  fontSize: '0.9rem',
  color: '#FF76D6',
});
export const PublishedDateTypography = styled('div')({
  marginTop:'0.5vh',
  fontSize: '0.7rem',
  color: 'grey',
});
export const StyledCardMedia = styled('div')({
  height: '200px',  // Adjusted height for image section
  
});

export const StyledCardContent = styled('div')({
  padding: '5px',  // Adjusted padding to make black section shorter
});

export const ContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
});

export const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});


export const ReactionButton = styled('button')(({ selected }) => ({
  backgroundColor: 'transparent',
  color: selected ? '#ff24bd' : 'darkgrey',
  margin: '5px',
  padding: '10px 0px 10px 10px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ReactionCount = styled('span')({
  fontSize: '1.2rem',
  marginLeft: '8px',
  display: 'flex',
  alignItems: 'center',
});

export const StyledCreateButton = styled(Button)({
  backgroundColor: "#f57fd9",
  color: "black",
  width:"55%",
  height:"5vh",
  padding: "1vh",
  margin: "auto",
  borderRadius:"3vh",
  "&:hover": {
      backgroundColor: "#f57fd9",
      opacity:"0.9",
  }
});
export const HeaderBar = styled('div')({
  marginBottom:'1vh',
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  padding: '10px 0',
  width: '100%',
});