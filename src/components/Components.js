import React, {useLayoutEffect, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditorFrame from './EditorFrame';
import Toolbar from './Toolbar';
import styles from './Components.module.scss';

const REFRESH_DELAY_MS = 300;

const Components = () => {
  const { t } = useTranslation();
  const list = useSelector((state) => state.components.list);
  const stateComponents = useSelector((state) => state.components);
  const states = useSelector((state) => state.components.states);
  const [componentEl, setComponentEl] = useState(null);

  const setRef = (e) => setComponentEl(e);

  const renderComponents = () => list.map((id) => {
    const props = states[id];
    return <EditorFrame key={id} id={id} {...props} />
  });

  const renderToolbar = ({active, states}) => {
    const clazz = states[active].component;
    return (
      <Toolbar component={clazz} id={active} />
    );
  };

  const renderOverlay = () => {
    return stateComponents.element && <Overlay element={stateComponents.element} refElement={componentEl} />
  };

  return (
    <div className={styles.Editor}>
      <div className={styles.Header}>
        {stateComponents.active && renderToolbar(stateComponents)}
      </div>
      <div className={styles.Components} ref={setRef}>
        {renderOverlay()}
        {renderComponents()}
      </div>
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

export default Components;
