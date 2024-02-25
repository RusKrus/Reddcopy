import React, { useEffect } from 'react';
import videojs from 'video.js';
import { intersectHandler } from "../helperFuncs/helperFuncs";
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady, classNames} = props;
  
  //configuring intersection
  const observerOptions = {
    threshold: 0.70
  }
  const observer = new IntersectionObserver(intersectHandler, observerOptions);


  useEffect(() => {

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add(classNames[0]);
      videoRef.current.appendChild(videoElement);
      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      });
      observer.observe(videoElement);

    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
        observer.disconnect();
      }
    };
  }, [playerRef]);

  return (
    <div className={classNames[1]} onClick={e=>e.stopPropagation()} data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;