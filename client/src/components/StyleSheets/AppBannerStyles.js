import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Select from '@mui/material/Select';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

export const StyledAppBar = styled(AppBar)({
  backgroundColor: 'black', // Set the AppBar color to black
  borderBottom: '1px solid #FF76D6',
});

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between', // Adjust this to position children with space between them
  padding: theme.spacing(0, 2), // Add padding to the sides
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 4, // More rounded corners
  backgroundColor: '#505050', // Grey background
  display: 'flex',
  alignItems: 'center',
  width: '60%', // Set width to 60%
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

export const SearchSelect = styled(Select)(({ theme }) => ({
  marginRight: theme.spacing(1), // Add some space between the select and the input
  '& .MuiSelect-select': {
    padding: theme.spacing(1), // Consistent padding
    paddingRight: theme.spacing(3), // Make room for the dropdown icon
    borderRadius: theme.shape.borderRadius * 4, // More rounded corners
    backgroundColor: '#505050', // Grey background
    '&:focus': {
      borderRadius: theme.shape.borderRadius * 4, // More rounded corners
      backgroundColor: '#505050', // Maintain the background on focus
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove border
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    color: 'none', // Remove border on hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove border on focus
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius * 4, // More rounded corners
    backgroundColor: '#505050', // Grey background
    padding: theme.spacing(1, 1, 1, 1), // Adjust padding to not overlap with the dropdown
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const UserIconButton = styled(IconButton)(({ theme }) => ({
  color: '#ff24bd',
  marginLeft: theme.spacing(2),
  '&:hover': {
    color: '#FF76D6',
  },
  '& .MuiSvgIcon-root': { 
    fontSize: '2rem',
  },
}));

export const LogoButton = styled(ExploreOffIcon)(({ theme }) => ({
  color: '#ff24bd',
  margin: '0px 3px',
  '&:hover': {
    color: '#FF76D6',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2rem', 
  },
}));

export const dropdownStyle = {
  '& .MuiPaper-root': {
    backgroundColor: 'black',
    borderRadius: 10,
    border: '1px solid #FF76D6',
    color: '#ff24bd',
    '& .MuiMenuItem-root': {
      // Styles for each dropdown item
      '&:hover': {
        backgroundColor: '#ff24bd',
        color: 'black',
      },
    },
  },
};

export const StyledMenu = styled(Menu)(({ theme }) => dropdownStyle);
