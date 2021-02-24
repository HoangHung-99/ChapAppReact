import React from "react";
import { formatRelative } from 'date-fns'

const Messages = ({
  createAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  return <div>
      {photoURL ? (
          <img src={photoURL} alt="Avatar" width={45} height={45}/>
      ) : null}
      {displayName ? <p>{displayName}</p> : null}
      {createAt ?.second ? (
          <span>
              {formatRelative(new Date(createAt.second * 1000), new Date())}
          </span>
      ) : null}
      <p>{text}</p>
  </div>;
};

export default Messages;
