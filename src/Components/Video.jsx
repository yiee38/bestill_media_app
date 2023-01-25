import React from 'react';
import { motion } from 'framer-motion';

function VideoPlayer(props) {
  return (
    <motion.video 
      src={props.src} 
      controls={props.controls} 
      style={{width: '100%', height: 'auto'}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
          duration: 0.9,
          ease: [0, 0.71, 0.2, 1.01]
      }}
    />
  );
}

export default VideoPlayer;