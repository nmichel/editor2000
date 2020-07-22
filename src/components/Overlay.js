import React, {useLayoutEffect, useState, useEffect} from 'react';
import styles from './Overlay.module.scss';

const REFRESH_DELAY_MS = 300;

const Overlay = ({element, refElement}) => {
  const [position, setPosition] = useState(null);
  const [refPosition, setRefPosition] = useState(null);

  useLayoutEffect(() => {
    if (!refElement) {
      return;
    }

    const refElementPositionList = refElement.getClientRects();
    const refElementPosition = refElementPositionList && refElementPositionList[0];
    setRefPosition(refElementPosition);

    const refresherId = setInterval(() => {
      const newPositionList = refElement.getClientRects();
      const newPosition = newPositionList && newPositionList[0];
      setRefPosition((oldPosition) => {
        const areSameDOMRect = identicalDOMRect(oldPosition, newPosition);
        return areSameDOMRect ? oldPosition : newPosition;
      });
    }, REFRESH_DELAY_MS);

    return () => {
      console.log('clearing');
      clearInterval(refresherId);
    };

  }, [refElement]);

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const newPositionList = element.getClientRects();
    const newPosition = newPositionList && newPositionList[0];
    setPosition(newPosition);

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        console.log('resize', entry);
      }
    });

    resizeObserver.observe(element);

    const refresherId = setInterval(() => {
      const newPositionList = element.getClientRects();
      const newPosition = newPositionList && newPositionList[0];
      setPosition((oldPosition) => {
        const areSameDOMRect = identicalDOMRect(oldPosition, newPosition);
        return areSameDOMRect ? oldPosition : newPosition;
      });
    }, REFRESH_DELAY_MS);

    return () => {
      console.log('clearing');
      clearInterval(refresherId);
      resizeObserver.unobserve(element);
    }
  }, [element, refElement]);

  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!position || !refPosition) {
      return;
    }

    setStyle((style) => {
      const newStyle = {...style,
        left: position.left - refPosition.left,
        top: position.top - refPosition.top,
        width: position.width,
        height: position.height
      };
      return newStyle;
    });

  }, [position, refPosition]);

  return (
    <div className={`${styles.Overlay} ${styles.edit}`} style={style}>
      <div className={`${styles.OverlayHeader}`} />
    </div>
  );
};

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