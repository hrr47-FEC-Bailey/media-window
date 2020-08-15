import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  width: 1202px;
  position: absolute;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
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
  margin: 2px;
  overflow-x: hidden;
  overflow-y: auto;
`;
const ColBorder = styled.div`
   flex-direction: row;
  vertical-align: middle;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 65px;
  width: 116px;
  background: transparent;
  line-height: 65px;
  margin: 2px;
  overflow-x: hidden;
  overflow-y: auto;
  top: -10px;
  border-width: 3px;
  border-style: solid;
  border-color: #c7d5e0;
  z-index: 50;
  pointer-events: none;
`;


const ImageListEntry = (props) => {
  if (props.image.isActive === true) {
    return (
      <ColBorder>
        <img
          width="116"
          height="65"
          src ={props.image.image}
          alt="Picture of Video Game"
          onClick={() => {
          props.changeMedia(props.image.image);
          props.borderSelect(props.image.image)
          }}/>
      </ColBorder>
    )
  } else {
    return (
      <Col className={'normal'}>
        <img
          width="116"
          height="65"
          src ={props.image.image}
          alt="Picture of Video Game"
          onClick={() => {
          props.changeMedia(props.image.image);
          props.borderSelect(props.image.image)
          }}/>
      </Col>
    )
  }
}

export default ImageListEntry;