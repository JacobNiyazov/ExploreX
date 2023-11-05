import React from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { StyledAppBar, StyledToolbar, Search, StyledInputBase, SearchSelect, UserIconButton, dropdownStyle } from './AppBannerStyles';

function AppBanner() {
  const [searchType, setSearchType] = React.useState('user'); // Default to 'user'

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        {/* Logo and AppName */}
        {/* <img src="/path-to-your-logo.png" alt="Logo" style={{ marginRight: 8 }} /> */}
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
          ExploreX
        </Typography>
        {/* Search Bar with Dropdown */}
        <Search>
        <SearchSelect
            value={searchType}
            onChange={handleSearchTypeChange}
            displayEmpty
            variant="outlined"
            MenuProps={{
              // Here we apply the custom styles for the dropdown
              PaperProps: {
                style: dropdownStyle['& .MuiPaper-root'],
              },
            }}
            sx={{ color: '#ff24bd', zIndex: 1 }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="map">Map Name</MenuItem>
          </SearchSelect>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="submit" aria-label="search" sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 0 }}>
            <SearchIcon />
          </IconButton>
        </Search>
        {/* User Icon */}
        <UserIconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
        >
          <AccountCircle />
        </UserIconButton>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default AppBanner;
