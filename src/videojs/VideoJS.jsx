import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady, className, isShowNsfwClicked} = props;
  
  
  
  //configuring intersection
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.style.filter = isShowNsfwClicked ? "none" : "blur(20px)";
    }

    const intersectHandler = async (entries) =>{
      const videoElement = entries[0].target.querySelector('video');
      if(isShowNsfwClicked){
        try{
          if(entries[0].isIntersecting){
              await videoElement.play();
          }
          else{
              videoElement.pause();
          }
        }
          catch(e){
            console.log(e);
        }
      }
    } 

    const observerOptions = {
      threshold: 0.70
    }
    const observer = new IntersectionObserver(intersectHandler, observerOptions);  

    observer.observe(videoElement);

    return ()=>{
      if (videoElement){
        observer.disconnect();
      }
    }

  }, [isShowNsfwClicked]);

  


  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add(className);
      videoRef.current.appendChild(videoElement);
      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player); 
      });
    } 
    else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady, className]);



  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div  onClick={e=>e.stopPropagation()} data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;