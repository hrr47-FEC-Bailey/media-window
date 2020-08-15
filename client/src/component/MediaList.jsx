import React from "react";
import ImageListEntry from "./ImageListEntry.jsx";
import VideoListEntry from "./VideoListEntry.jsx";
import styled from 'styled-components';

const Grid = styled.div`
  width: 1202px;
  position: absolute;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
`;
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

// const MediaList = (props) => (
//   <Row>
    // <Col>
    //    {console.log(props)}
    //   <iframe width="116" height="65" src={props.video[0].video} onClick={() => props.changeMedia(props.video[0].video)}></iframe>
    // </Col>
//     {props.images.map((image) => (
//       <MediaListEntry
//       image={image}
//       changeMedia={props.changeMedia}
//       video={props.video}
//       />
//     ))}
//   </Row>
// )

const MediaList = (props) => (
  <Row>
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
  </Row>
)


export default MediaList;