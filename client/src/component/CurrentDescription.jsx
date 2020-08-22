import React from "react";


const CurrentDescription = (props) => {
  let description = props.description;
  if (description !== undefined) {
    return (
      <div>
        <span>{description}</span>
      </div>
    );
  } else {
    return null;
  }
}

export default CurrentDescription;