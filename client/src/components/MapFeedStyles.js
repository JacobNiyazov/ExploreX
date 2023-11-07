import { styled } from '@mui/material/styles';

export const StyledMapFeed = styled('div')({
  backgroundColor: '#505050',
  overflowY: 'auto',
  padding: '20px',
  width: '65%',  // Adjust width as needed
  margin: 'auto',
  height: '100vh',  // Full view height
});

export const StyledCard = styled('div')({
  backgroundColor: 'black',
  color: '#FF76D6',
  marginBottom: '20px',
  padding: '10px',
  height: '275px'
});

export const TitleTypography = styled('div')({
  fontSize: '1.2rem',
  fontWeight: 'bold',
});

export const AuthorTypography = styled('div')({
  fontSize: '0.9rem',
  color: '#FF76D6',
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