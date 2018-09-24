import React from 'react';
import { Main, Opener, TransitionContainer, SuperTitle, Container } from '../styled-components';

const NotFoundPage = () => (
  <Main>
    <TransitionContainer>
      <Container>
        <SuperTitle
          colour={colours[title.length]}
        >
          Nothing here, sorry! (404)
        </SuperTitle>
      </Container>
    </TransitionContainer>
  </Main>
)

export default NotFoundPage
