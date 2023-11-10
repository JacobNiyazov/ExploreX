import React from 'react';
import { FooterContainer, FooterText } from './StyleSheets/FooterStyles';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <FooterContainer maxWidth={false} component="footer">
      <FooterText variant="body1">
        <CopyrightIcon fontSize="small" />
        Developed by ExploreX
      </FooterText>
    </FooterContainer>
  );
}

export default Footer;
