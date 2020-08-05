import React, { useEffect, useState, useRef } from 'react';
import { registerComponent } from './registry';

const YOUTUBE_SRC = "https://www.youtube.com/iframe_api";

const Youtube = React.forwardRef(({params, onClick, style, ...rest}, ref) => {
  const [sdkReady, setSdkReady] = useState(false);
  const playerRef = useRef();
  let player = null;

  useEffect(() => {
    if (document.querySelector(`script[src="${YOUTUBE_SRC}"]`)) {
      setSdkReady(true);
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      setSdkReady(true);
    };

    const youtubeScript = document.createElement("script");
    youtubeScript.src = YOUTUBE_SRC;
    document.head.appendChild(youtubeScript);
  }, [setSdkReady]);

  useEffect(() => {
    if (!sdkReady) {
      return;
    }
/*
    player = new window.YT.Player(playerRef.current);
    player.addEventListener("onStateChange", (event) => {
      console.log('EVENT CODE', event.data);
    });
    */
  }, [sdkReady, playerRef]);

  const containerStyle = {
    ...style,
    position: 'relative'
  }

  const editbuttonStyle = {
    position: 'absolute',
    color: 'white'
  }

  return (
    <div ref={ref} style={containerStyle} {...rest}>
      <div style={editbuttonStyle} onClick={(event) => onClick(event)}>EDIT</div>
      <iframe ref={playerRef} title="y" src="https://www.youtube.com/embed/9UaJAnnipkY?controls=0&enablejsapi=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
});

const YoutubeEditor = React.forwardRef(({params, ...rest}, ref) => {
  const playerRef = useRef();

  return (
    <div ref={ref} {...rest}>
      <iframe ref={playerRef} title="y" src="https://www.youtube.com/embed/9UaJAnnipkY?controls=0&enablejsapi=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
});

registerComponent({
  name: 'youtube',
  component: Youtube,
  editor: YoutubeEditor,
  default: {
    component: 'youtube',
    params: {
    },
    style: {}
  }
});

export default Youtube;
