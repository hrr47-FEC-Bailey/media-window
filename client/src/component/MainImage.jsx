import React from 'react';
import styles from './styles.css';



const MainImage = (props) => {
  if (props.activeImage === false) {
    return null;
  } else {
    return (
      <div>
        <div>
          <div className={styles.carousel_background} onClick={() => {props.exitImage()}}></div>
        </div>
        <div className={styles.carousel_image_container}>
          <div className={styles.carousel_content}>
            <img src={props.currentImage} className={styles.carousel_image}/>
            <div>
              <div className={styles.carousel_prev} onClick={() => { props.carouselScrollLeft()}}>
                <span>Prev</span>
              </div>
            </div>
            <div>
              <div className={styles.carousel_next} onClick={() => { props.carouselScrollRight()}}>
                <span>Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default MainImage;