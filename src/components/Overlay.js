import React, {useLayoutEffect, useState, useEffect} from 'react';
import styles from './Overlay.module.scss';

const Overlay = ({element, refElement, children}) => {
  const position = useDOMRect(element);
  const refPosition = useDOMRect(refElement);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!position || !refPosition) {
      return;
    }

    setStyle((style) => {
      const newStyle = {...style,
        left: position.left - refPosition.left,
        top: position.top - refPosition.top,
        minWidth: position.width,
        minHeight: position.height
      };
      return newStyle;
    });

  }, [position, refPosition]);

  return (
    <div className={`${styles.Overlay} ${styles.edit}`} style={style}>
      <div className={`${styles.OverlayHeader}`} />
      <div className={`${styles.OverlayContent}`}>
        {children}
      </div>
    </div>
  );
};

const useDOMRect = (element) => {
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const refElementPositionList = element.getClientRects();
    const refElementPosition = refElementPositionList && refElementPositionList[0];
    setPosition(refElementPosition);

    const refresherId = setInterval(() => {
      const newPositionList = element.getClientRects();
      const newPosition = newPositionList && newPositionList[0];
      setPosition((oldPosition) => {
        const areSameDOMRect = identicalDOMRect(oldPosition, newPosition);
        return areSameDOMRect ? oldPosition : newPosition;
      });
    }, REFRESH_DELAY_MS);

    return () => {
      clearInterval(refresherId);
    };

  }, [element]);

  return position;
};

const REFRESH_DELAY_MS = 300;

const identicalDOMRect = (r1, r2) => {
  if (!r1 || !r2) return false;

  return (
    r1.x === r2.x && 
    r1.y === r2.y && 
    r1.top === r2.top && 
    r1.left === r2.left && 
    r1.right === r2.right && 
    r1.bottom === r2.bottom && 
    r1.width === r2.width && 
    r1.height === r2.height 
  );
}

export default Overlay;
