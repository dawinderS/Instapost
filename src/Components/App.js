import React from 'react';
import { gql } from 'apollo-boost';
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from 'react-apollo-hooks';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Footer from './Footer';
import Header from './Header';
import Bottom from './Bottom';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 770px) {
    min-height: 85vh;
  }
  @media screen and (max-width: 770px) {
    min-height: 75vh;
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
`;

export default () => {
  
  const { data : { isLoggedIn } } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              {!isLoggedIn &&  <Footer />}
            </Wrapper>
            {isLoggedIn && <Bottom />}
          </>
        </Router>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
      </>
    </ThemeProvider>
  );
};
