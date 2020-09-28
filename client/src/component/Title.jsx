import React from 'react';
import styles from './styles.css';
import { createGlobalStyle } from 'styled-components';
createGlobalStyle`
*{all: initial;}`


const Title = (props) => (
    <div className={styles.game_title}>
      <span>{props.currentGame.title}</span>
    </div>
);


export default Title;