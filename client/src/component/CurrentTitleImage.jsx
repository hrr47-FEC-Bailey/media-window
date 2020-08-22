import React from "react";


const CurrentTitleImage = (props) => {
  let currentImage = props.images[0];
  if (currentImage !== undefined) {
    return (
      <div>
        <img width="324" height='151' src={currentImage.image} alt={'Picture of Game'}/>
      </div>
    );
  } else {
    return null;
  }
}

export default CurrentTitleImage;