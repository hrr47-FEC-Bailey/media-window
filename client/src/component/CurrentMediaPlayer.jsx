import React from 'react';
import styles from './styles.css';


const CurrentMediaPlayer = (props) => {
  var arr = props.currentMedia.split('.');
  if (arr.indexOf('jpeg') > -1 || arr.indexOf('jpg') > -1) {
    return (
      <div>
        <img width="600" height="337" src={props.currentMedia} onClick={() => { props.selectImage(props.currentMedia)}}/>
      </div>
    )
  } else {
    return (
      <div>
        <iframe width="600" height="337" src={props.currentMedia} ></iframe>
      </div>
    )
  }
}


export default CurrentMediaPlayer;