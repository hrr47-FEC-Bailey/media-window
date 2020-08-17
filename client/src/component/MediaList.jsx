import React from 'react';
import ImageListEntry from './ImageListEntry.jsx';
import VideoListEntry from './VideoListEntry.jsx';
import styled from 'styled-components';
import styles from './styles.css';


const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: auto;
  white-space: nowrap;
  width: 600px;
`;


// const Row = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 100px;
//     background: #1B2838;
//     display: flex;
//     justify-content: flex-start;
//     overflow-x: auto;
//     overflow-y: hidden;
//   }
//   ::-webkit-scrollbar {
//     width: 5px;
//     height: 20px;
//   }
//   ::-webkit-scrollbar-track {
//     border-radius: 3px;
//     width: 5px;
//     height: 20px;
//   }
//   ::-webkit-scrollbar-thumb {
//     background: #07014 !important;
//     border-radius: 3px;
//   }
//   ::-webkit-scrollbar-track {
//     background: #16202D !important;
//     border: 1px solid #16202D !important;
//   }
//   ::-webkit-scrollbar-thumb:hover {
//     background: #B30000;
//   }
//   ::-webkit-scrollbar-button {
//     background: #0B151F;
//     background-size: 10px 10px;
//     background-repeat: no-repeat;
//     background-position: center center;
//     -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
//     width: 40px;
//     border-radius: 5px;
//   }
//   ::-webkit-scrollbar-button:horizontal:decrement
//   {
//     border-width: 10px 20px 10px 0;
//     border-color: transparent #407899 transparent transparent;
//   }
//   ::-webkit-scrollbar-button:horizontal:increment
// {
//   border-width: 10px 0 10px 20px;
//   border-color: transparent transparent transparent #407899;
// }
// `;
const Col = styled.div`
  flex-direction: row;
  vertical-align: middle;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 65px;
  width: 116px;
  background: transparent;
  line-height: 65px;
  margin: 2px, 2px, 2px, 0px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const MediaList = (props) => (
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
)


export default MediaList;