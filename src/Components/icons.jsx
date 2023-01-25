import React from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

function PlayIcon(props) {
  return (
      <FaPlay className={props.className}/>
  );
}
function PauseIcon(props) {
    return (
        <FaPause className={props.className} />
    );
  }

// Export the icons as constants
export { PlayIcon, PauseIcon };