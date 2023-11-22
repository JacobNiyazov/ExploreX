import React, { useContext, useEffect, useState } from 'react';
import faqStyle from '../StyleSheets/faqStyle'; 
import { GlobalStoreContext } from '../../store';
import { AuthContext } from '../../auth';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const FAQScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const waitForAuthCheck = async () => {
        if (auth.loggedIn === undefined) {
            // Wait until authentication check is completed
            await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
            waitForAuthCheck(); // Re-check status
        } else {
            if(!auth.loggedIn){
                store.setCurrentPage(store.currentPageType.login)
                navigate("/login");
            }   
            setLoading(false);
            
        }
    };

    waitForAuthCheck();
  }, [auth.loggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (store.currentPage === store.currentPageType.faqScreen){
    return (
      <Container style = {faqStyle.container}>
        <Typography style = {faqStyle.header_text} variant="h6">Don't know where to start?</Typography>
        <div style = {faqStyle.columns}>
          <div style = {faqStyle.column}>
            <Accordion style = {faqStyle.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq1-content"
                id="faq1-header"
              >
                <Typography variant="h6">What files are supported for uploading?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>GeoJSON, KML, and shapefiles</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion style = {faqStyle.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq2-content"
                id="faq2-header"
              >
                <Typography variant="h6">Do I need an account to view maps?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>No, simply choose the log in as guest option at the login page.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style = {faqStyle.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="h6">What maps are currently supported?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Voronoi, Heat, Choropleth, Spike and Dot Maps</Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div style = {faqStyle.column}>
            <Accordion style = {faqStyle.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq3-content"
                id="faq3-header"
              >
                <Typography variant="h6">Why should I make an account?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>You can like or comment on other user's maps and create your own public maps and share them with the map community</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion style = {faqStyle.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="h6">Is this free?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Yes, ExploreX is free for all to use.</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion style = {faqStyle.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="h6">More questions?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Contact us at ExploreX@gmail.com</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        
      </Container>
    );
  }
  else{
    return <div></div>
  }
};

export default FAQScreen;
