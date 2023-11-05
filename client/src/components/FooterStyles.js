import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const FooterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'black',
  color: '#ff24bd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export const FooterText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: '4px',
  },
});
