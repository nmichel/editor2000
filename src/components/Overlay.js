import React, {useLayoutEffect, useState, useEffect} from 'react';
import styles from './Overlay.module.scss';

const Overlay = ({element, refElement, children}) => {
  const position = useDOMRect(element);
  const refPosition = useDOMRect(refElement, false);
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

function parseMetricProp(value, suffix = "px") {
  return parseInt(value.substring(0, value.length - suffix.length));
}

const useDOMRect = (element, withMargin = true) => {
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const refElementPositionList = element.getClientRects();
    const refElementPosition = refElementPositionList && refElementPositionList[0];
    if (!refElementPosition) {
      return;
    }

    if (withMargin) {
      const style = window.getComputedStyle(element);
      const mt = parseMetricProp(style.getPropertyValue('margin-top'));
      const ml = parseMetricProp(style.getPropertyValue('margin-left'));
      const mb = parseMetricProp(style.getPropertyValue('margin-bottom'));
      const mr = parseMetricProp(style.getPropertyValue('margin-right'));
  
      let adjustedRect = {};
      adjustedRect.left = refElementPosition.left - ml;
      adjustedRect.top = refElementPosition.top - mt;
      adjustedRect.width = refElementPosition.width + ml + mr;
      adjustedRect.height = refElementPosition.height + mt + mb;
  
      setPosition(adjustedRect);
  
    }
    else {
      setPosition(refElementPosition);
    }

    const refresherId = setInterval(() => {
      const newPositionList = element.getClientRects();
      const newPosition = newPositionList && newPositionList[0];
      setPosition((oldPosition) => {

        if (withMargin) {
          const style = window.getComputedStyle(element);
          const mt = parseMetricProp(style.getPropertyValue('margin-top'));
          const ml = parseMetricProp(style.getPropertyValue('margin-left'));
          const mb = parseMetricProp(style.getPropertyValue('margin-bottom'));
          const mr = parseMetricProp(style.getPropertyValue('margin-right'));
      
          let adjustedRect = {};
          adjustedRect.left = newPosition.left - ml;
          adjustedRect.top = newPosition.top - mt;
          adjustedRect.width = newPosition.width + ml + mr;
          adjustedRect.height = newPosition.height + mt + mb;
      
          const areSameDOMRect = identicalDOMRect(oldPosition, adjustedRect);
          return areSameDOMRect ? oldPosition : adjustedRect;
        }
        else {
          const areSameDOMRect = identicalDOMRect(oldPosition, newPosition);
          return areSameDOMRect ? oldPosition : newPosition;
        }
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
//    r1.x === r2.x && 
//    r1.y === r2.y && 
    r1.top === r2.top && 
    r1.left === r2.left && 
//    r1.right === r2.right && 
//      r1.bottom === r2.bottom && 
    r1.width === r2.width && 
    r1.height === r2.height 
  );
}

export default Overlay;
