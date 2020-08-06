import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { registerComponent } from './registry';
import styles from './YoutubeVideo.module.scss';

const YOUTUBE_SRC = "https://www.youtube.com/iframe_api";

const Youtube = React.forwardRef(({params, onClick, onDragOver, onDrop, style, active, ...rest}, ref) => {
  const { t } = useTranslation();
  const isDragging = useSelector((state) => state.components.dragging);
  const [sdkReady, setSdkReady] = useState(false);
  const playerRef = useRef();
  // let player = null;

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

    // Currently this code is useEffect hook is useless, but it could be the place to take
    // actions after the YT sdk is loaded.
    //
    // e.g.
    // 
    // player = new window.YT.Player(playerRef.current);
    // player.addEventListener("onStateChange", (event) => {
    //   console.log('EVENT CODE', event.data);
    // });
  }, [sdkReady, playerRef]);

  const containerStyle = {
    position: 'relative'
  }

  const iframeStyle = {
    ...style,
    pointerEvents: (isDragging || active) ? 'none' : 'initial'
  }

  return (
    <div ref={ref} style={containerStyle} {...rest}>
      {!active && <div className={`${styles.EditBar}`} onClick={onClick} onDragOver={onDragOver} onDrop={onDrop}>{t('YoutubeVideo.click_to_edit')}</div>}
      <iframe style={iframeStyle} ref={playerRef} title="y" src={params.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
});

registerComponent({
  name: 'youtube',
  component: Youtube,
  onsite: [
    ['url', 'text']
  ],
  default: {
    component: 'youtube',
    params: {
      url: 'https://www.youtube.com/embed/4OkSsFsXLD8?controls=0&enablejsapi=1'
    },
    style: {}
  }
});

export default Youtube;
