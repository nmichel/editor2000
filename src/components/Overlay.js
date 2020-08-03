import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions';
import styles from './Overlay.module.scss';

const Overlay = ({element, refElement, children}) => {
  const dispatch = useDispatch();
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

  const startDrag = () => {
    dispatch(actions.component.startDrag())
  }
  
  return (
    <div draggable onDragStart={startDrag} className={`${styles.Overlay} ${styles.edit}`} style={style}>
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
  const [rect, setRect] = useState(null);

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const refElementRectList = element.getClientRects();
    const refElementRect = refElementRectList && refElementRectList[0];
    if (!refElementRect) {
      return;
    }

    const overlayRect = withMargin ? adjustRectWithMargin(refElementRect, element) : refElementRect;
    setRect(overlayRect);

    const refresherId = setInterval(() => {
      const newRectList = element.getClientRects();
      const newRect = newRectList && newRectList[0];

      setRect((oldRect) => {
        const overlayRect = withMargin ? adjustRectWithMargin(newRect, element) : newRect;
        const areSameRect = identicalRect(oldRect, overlayRect);
        return areSameRect ? oldRect : overlayRect;
      });
    }, REFRESH_DELAY_MS);

    return () => {
      clearInterval(refresherId);
    };

  }, [element, withMargin]);

  return rect;
};

const REFRESH_DELAY_MS = 300;

function adjustRectWithMargin(rect, element) {
  const style = window.getComputedStyle(element);
  const mt = parseMetricProp(style.getPropertyValue('margin-top'));
  const ml = parseMetricProp(style.getPropertyValue('margin-left'));
  const mb = parseMetricProp(style.getPropertyValue('margin-bottom'));
  const mr = parseMetricProp(style.getPropertyValue('margin-right'));

  return (
    {
      left: rect.left - ml,
      top: rect.top - mt,
      width: rect.width + ml + mr,
      height: rect.height + mt + mb
    }
  );
}

const identicalRect = (r1, r2) => {
  if (!r1 || !r2) return false;

  // Compare only used properties
  return (
    r1.top === r2.top && 
    r1.left === r2.left && 
    r1.width === r2.width && 
    r1.height === r2.height 
  );
}

export default Overlay;
