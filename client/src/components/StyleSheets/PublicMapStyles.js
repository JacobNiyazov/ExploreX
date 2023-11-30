import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';


export const StyledCard = styled(Card)({
  maxWidth: '75%',
  margin: 'auto',
  marginTop: '20px',
  marginBottom: '20px',
  backgroundColor: '#000',
});

export const StyledCardMedia = styled(CardMedia)({
  height: '60vh', // 60% of the viewport height
  width: '85vh', // full width of the card
  objectFit: 'contain', // to make sure the image is fully visible
  padding: 10,
  marginTop: 10,
  border: '1px solid #FF76D6',
  boxSizing: 'border-box', // ensures padding and borders are included in the total width and height
});


export const StyledCardContent = styled(CardContent)({
  padding: 16,
});

export const StyledTypography = styled(Typography)({
  textAlign: 'center',
});

export const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '16px 0',
});

export const StyledForkButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 15,
  zIndex: 1000,
  backgroundColor: '#FF76D6',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FF60C5',
  },
}));