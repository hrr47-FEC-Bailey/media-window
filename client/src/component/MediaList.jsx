import React from 'react';
import ImageListEntry from './ImageListEntry.jsx';
import VideoListEntry from './VideoListEntry.jsx';
import styles from './styles.css';


const MediaList = (props) => (
  <div id={styles.row}>
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
)


export default MediaList;