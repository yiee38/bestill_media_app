import React, { useState, useRef, useEffect } from 'react';
import '../Styles/player.css'; // Import the CSS file
import { PlayIcon, PauseIcon } from './icons';
import { motion } from "framer-motion";

function AudioPlayer(props) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressRef = useRef();

  useEffect(() => {
    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
    audioRef.current.onloadedmetadata = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    };
  }, [props.src]);

  const handlePlay = () => {
    setPlaying(true);
    audioRef.current.play();
  };

  const handlePause = () => {
    setPlaying(false);
    audioRef.current.pause();
  };
  /*
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };
  */
  const handleProgressMouseDown = () => {
    audioRef.current.pause();
    document.addEventListener('mousemove', handleProgressMouseMove);
    document.addEventListener('mouseup', handleProgressMouseUp);
  };

  const handleProgressMouseMove = (e) => {
    const progressBarRect = progressRef.current.getBoundingClientRect();
    const progress = (e.clientX - progressBarRect.left) / progressBarRect.width;
    audioRef.current.currentTime = progress * duration;
  };

  const handleProgressMouseUp = (e) => {
    document.removeEventListener('mousemove', handleProgressMouseMove);
    document.removeEventListener('mouseup', handleProgressMouseUp);
    audioRef.current.play();
    if (!playing){
        setPlaying(true);
    }
  };

  return (
    <motion.div className='progress-container' 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.9,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <audio ref={audioRef} src={props.src} />
      <button onClick={playing ? handlePause : handlePlay} className='player-button'>
        {playing ? <PauseIcon className="player-button-icon"/> : <PlayIcon className="player-button-icon"/>}
      </button>
      <div
        ref={progressRef}
        onMouseDown={handleProgressMouseDown}
        onMouseUp={handleProgressMouseUp}
        onClick={handleProgressMouseMove}
        className="progress-bar"
        style={{
          width: props.width || '100%'
        }}
      >
        <div
          style={{
            width: `${(currentTime / duration) * 100}%`
          }}
          className="progress"
        />
      </div>
    </motion.div>
  );
}

export default AudioPlayer;