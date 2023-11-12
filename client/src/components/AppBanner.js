import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import Menu from '@mui/material/Menu';

import { GlobalStoreContext } from './store'

import { StyledAppBar, StyledToolbar, Search, StyledInputBase, SearchSelect, UserIconButton, dropdownStyle, StyledMenu, StyledTypography, LogoButton } from './StyleSheets/AppBannerStyles';

function AppBanner() {
  const [searchType, setSearchType] = React.useState('user'); // Default to 'user'

  const { store } = useContext(GlobalStoreContext);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  // State for the account menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    store.setCurrentPage(store.currentPageType.mapFeed);
  };

  const handleRegister = (e) => {
    store.setCurrentPage(store.currentPageType.registerScreen);
  };

  const handleLogin = (e) => {
    store.setCurrentPage(store.currentPageType.login);
  };

  const handleFAQ = () => {
    store.setCurrentPage(store.currentPageType.faqScreen);
  }

  if (store.currentPage == store.currentPageType.login){
    return (
      <StyledAppBar position="static">
        <StyledToolbar>
          {/* Logo and AppName */}
          {/* <img src="/path-to-your-logo.png" alt="Logo" style={{ marginRight: 8 }} /> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
            ExploreX
          </Typography>
          <Link style = {{color: "#FF76D6"}} onClick={handleRegister}>Don't have an account?</Link>

        </StyledToolbar>
      </StyledAppBar>
    )
  }
  if (store.currentPage == store.currentPageType.registerScreen || store.currentPage == store.currentPageType.forgotPassScreen){
    return (
      <StyledAppBar position="static">
        <StyledToolbar>
          {/* Logo and AppName */}
          {/* <img src="/path-to-your-logo.png" alt="Logo" style={{ marginRight: 8 }} /> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
            ExploreX
          </Typography>
          <Link style = {{color: "#FF76D6"}} onClick={handleLogin}>Return to Login</Link>

        </StyledToolbar>
      </StyledAppBar>
    )
  }
  console.log(store.currentPage)
  if (store.currentPage == store.currentPageType.faqScreen){
    return (
      <StyledAppBar position="static">
        <StyledToolbar>
          {/* Logo and AppName */}
          {/* <img src="/path-to-your-logo.png" alt="Logo" style={{ marginRight: 8 }} /> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
            ExploreX
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
            Frequently Asked Questions
          </Typography>
          
          {/* User Icon */}
          <UserIconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={isMenuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircle />
          </UserIconButton>
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom', // Changed to 'bottom' to position the menu below the AppBar
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top', // Changed to 'top' to align the top of the menu with the bottom of the AppBar
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={handleAccountMenuClose}>My Profile</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>Edit Account</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>FAQ</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
          </StyledMenu>
        </StyledToolbar>
      </StyledAppBar>
    )
  }
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        {/* Logo and AppName */}
        <LogoButton onClick={handleLogoClick}/>
        <StyledTypography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }} onClick={handleLogoClick}>
          ExploreX
        </StyledTypography>
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
          aria-controls={isMenuOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          onClick={handleAccountMenuOpen}
        >
          <AccountCircle />
        </UserIconButton>
        <StyledMenu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom', // Changed to 'bottom' to position the menu below the AppBar
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top', // Changed to 'top' to align the top of the menu with the bottom of the AppBar
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleAccountMenuClose}
        >
          <MenuItem onClick={handleAccountMenuClose}>My Profile</MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>Edit Account</MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>FAQ</MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
        </StyledMenu>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default AppBanner;
