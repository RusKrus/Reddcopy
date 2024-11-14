import React, { useEffect } from 'react';
import { VideojsProps, ObserverEntryType } from '../helperData/types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export type Player = ReturnType<typeof videojs>

export const VideoJS = (props: VideojsProps) => {
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<Player | null> (null);
  const {options, onReady, className, isShowNsfwClicked, isAppleMobileDevice} = props;
  
  
  
  //configuring intersection
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement instanceof HTMLDivElement) {
      videoElement.style.filter = isShowNsfwClicked ? "none" : "blur(20px)";
    }

    const intersectHandler = async (entries: ObserverEntryType[]) =>{
      const videoElement: HTMLVideoElement | null = entries[0].target.querySelector('video');
      if(videoElement instanceof HTMLVideoElement&&isShowNsfwClicked&&!isAppleMobileDevice){
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

    const observerOptions:{ threshold: number } = {
      threshold: 0.70
    }
    const observer: IntersectionObserver = new IntersectionObserver(intersectHandler, observerOptions);  

    if(videoElement instanceof HTMLDivElement){
      observer.observe(videoElement);
    }
    return ()=>{
      if (videoElement instanceof HTMLDivElement){
        observer.disconnect();
      }
    }
  }, [isShowNsfwClicked, isAppleMobileDevice]);

  


  useEffect(() => {
    if (!playerRef.current) {
      const videoElement: HTMLElement = document.createElement("video-js");
      videoElement.classList.add(className);
      if(videoRef.current instanceof HTMLDivElement){
        videoRef.current.appendChild(videoElement);
      }
      const player: Player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player); 
      });
    } 
    /*else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }*/ 
  }, [options, videoRef, onReady, className]);



  useEffect(() => {
    const player: Player | null = playerRef.current;
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