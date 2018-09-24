import React from 'react';
import { Main, Opener, TransitionContainer, SuperTitle, Container } from '../styled-components';
import { GameContext } from '../contexts/GameContext';

const NotFoundPage = () => (
  <Main>
    <TransitionContainer>
      <Container>
        <GameContext.Consumer>
          {({ colours }) => {
            <SuperTitle colour={colours[6]}>
              Nothing here, sorry! (404)
            </SuperTitle>
          }}
        </GameContext.Consumer>
      </Container>
    </TransitionContainer>
  </Main>
)

export default NotFoundPage
