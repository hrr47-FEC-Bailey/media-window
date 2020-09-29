import React from 'react';
import styles from './styles.css';

const ImageListEntry = (props) => {
  if (props.image.isActive === true) {
    return (
      <div className={styles.col_border}>
        <img
          width="116"
          height="65"
          src ={props.image.image}
          alt="Picture of Video Game"
          onClick={() => {
          props.changeMedia(props.image.image);
          props.borderSelect(props.image.image)
          }}/>
      </div>
    )
  } else {
    return (
      <div className={styles.col} >
        <img
          width="116"
          height="65"
          src ={props.image.image}
          alt="Picture of Video Game"
          onClick={() => {
          props.changeMedia(props.image.image);
          props.borderSelect(props.image.image)
          }}/>
      </div>
    )
  }
}

export default ImageListEntry;