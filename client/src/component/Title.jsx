import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
width: 940px;
margin: 0 auto;
font-family: Arial, Helvetica, sans-serif;
color: #c6d4df;
background-color: #1b2838;
font-size: 12px;
`;

const GameTitle = styled(Body)`
  &&& {
    padding-top: 0px;
    max-width: 948px;
    margin: 0 auto;
    color: white;
    font-size: 26px;
    font-family: Motiva Sans, Sans-Serif;
    line-height: 32px;
  }
`
const Title = (props) => (
    <GameTitle>
      <span>{props.currentGame.title}</span>
    </GameTitle>
);


export default Title;