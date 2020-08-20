import React from "react";


const CurrentTitleImage = (props) => {
  let currentImage = props.images[0];
  if (currentImage !== undefined) {
    return (
      <div>
        <img width="373" height='174' src={currentImage.image} alt={'Picture of Game'}/>
      </div>
    );
  } else {
    return null;
  }
}

export default CurrentTitleImage;