import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';


import { GlobalStoreContext } from '../store'
import { AuthContext } from '../auth'

import { StyledAppBar, StyledToolbar, Search, StyledInputBase, SearchSelect, UserIconButton, dropdownStyle, StyledMenu, StyledTypography, LogoButton } from './StyleSheets/AppBannerStyles';

function AppBanner() {
  const [searchType, setSearchType] = React.useState('user'); // Default to 'user'

  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

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
    handleAccountMenuClose();
  };

  const handleFAQOption = () => {
    handleAccountMenuClose();
    store.setCurrentPage(store.currentPageType.faqScreen);
  };

  const handleProfileOption = () => {
    handleAccountMenuClose();
    store.setCurrentPage(store.currentPageType.profileScreen);
  };

  const handleEditAccOption = () => {
    handleAccountMenuClose();
    store.setCurrentPage(store.currentPageType.editAccScreen);
  };

  const handleMapFeedOption = () => {
    handleAccountMenuClose();
    store.setCurrentPage(store.currentPageType.mapFeed);
  };
  const handleLoginOption = () => {
    handleAccountMenuClose();
    store.setCurrentPage(store.currentPageType.login);
  };
  const handleRegisterOption = () => {
    handleAccountMenuClose();
    store.setCurrentPage(store.currentPageType.registerScreen);
  };

  let menuOptions = {'MyProfile':handleProfileOption, 'Edit Account':handleEditAccOption, 'Map Feed':handleMapFeedOption, 'FAQ':handleFAQOption, 'Logout':handleLogin}
  if(auth.isGuest){
    menuOptions = {'Map Feed':handleMapFeedOption, 'Login':handleLoginOption, 'Register':handleRegisterOption, 'FAQ':handleFAQOption}
  }
  if (store.currentPage === store.currentPageType.login){
    return (
      <StyledAppBar data-testid='app-banner' position="static">
        <StyledToolbar>
          {/* Logo and AppName */}
          <LogoButton data-testid='logo'/>
          <Typography data-testid='app-name' variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
            ExploreX
          </Typography>
          <Link style = {{color: "#FF76D6"}} onClick={handleRegister}>Don't have an account?</Link>

        </StyledToolbar>
      </StyledAppBar>
    )
  }
  if (store.currentPage === store.currentPageType.registerScreen || store.currentPage === store.currentPageType.forgotPassScreen){
    return (
      <StyledAppBar data-testid='app-banner' position="static">
        <StyledToolbar>
          {/* Logo and AppName */}
          <LogoButton data-testid='logo'/>
          <Typography data-testid='app-name' variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
            ExploreX
          </Typography>
          <Link style = {{color: "#FF76D6"}} onClick={handleLogin}>Return to Login</Link>

        </StyledToolbar>
      </StyledAppBar>
    )
  }
  console.log(store.currentPage)
  if (store.currentPage === store.currentPageType.faqScreen){
    return (
      <StyledAppBar data-testid='app-banner' position="static">
        <StyledToolbar>
          {/* Logo and AppName */}
          <LogoButton data-testid='logo'/>
          <Typography data-testid='app-name' variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }}>
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
            {Object.entries(menuOptions).map(([option, handler]) => (
            <MenuItem onClick={handler}>{option}</MenuItem>
          ))}
          </StyledMenu>
        </StyledToolbar>
      </StyledAppBar>
    )
  }
  return (
    <StyledAppBar data-testid='app-banner' position="static">
      <StyledToolbar>
        {/* Logo and AppName */}
        <LogoButton data-testid='logo' onClick={handleLogoClick}/>
        <StyledTypography data-testid='app-name' variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff24bd' }} onClick={handleLogoClick}>
          ExploreX
        </StyledTypography>
        {/* Search Bar with Dropdown */}
        <Search>
        <SearchSelect
            data-testid='search-type'
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
            <MenuItem data-testid='search-type-option1' value="user">User</MenuItem>
            <MenuItem data-testid='search-type-option2' value="map">Map Name</MenuItem>
          </SearchSelect>
          <StyledInputBase
            data-testid='search-bar'
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="submit" aria-label="search" sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 0 }}>
            <SearchIcon />
          </IconButton>
        </Search>
        {/* User Icon */}
        <UserIconButton
          data-testid='user-icon'
          edge="end"
          aria-label="account of current user"
          aria-controls={isMenuOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          onClick={handleAccountMenuOpen}
        >
          <AccountCircle />
        </UserIconButton>
        <StyledMenu
          data-testid='user-menu'
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
          {Object.entries(menuOptions).map(([option, handler]) => (
            <MenuItem data-testid={option} onClick={handler}>{option}</MenuItem>
          ))}
        </StyledMenu>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default AppBanner;
