import React from 'react';
import ImageListEntry from './ImageListEntry.jsx';
import VideoListEntry from './VideoListEntry.jsx';
import styles from './styles.css';


const MediaList = (props) => {
  if (props.activeImage === true) {
    return null;
  } else {
    return (
      <div>
        <div className={styles.row}>
          {props.video.map((video) => (
            <VideoListEntry
            video={video}
            changeMedia={props.changeMedia}
            borderSelect={props.borderSelect}
            />
          ))}
          {props.images.map((image) => (
            <ImageListEntry
            image={image}
            changeMedia={props.changeMedia}
            video={props.video}
            borderSelect={props.borderSelect}
            />
          ))}
        </div>
        <div className={styles.scroll_row}>
          <div className={styles.scroll_col}>
            <div className={styles.prev} onClick={props.scrollLeft}>
              <span></span>
            </div>
          </div>
          <div className={styles.scroll_col}>
            <div className={styles.next} onClick={props.scrollRight}>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default MediaList;