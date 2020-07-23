import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import YesNo, {withYesNo} from './YesNo';
import actions from '../../actions';
import commonStyle from '../common.module.scss';
import styles from './controls.module.scss';

const Delete = ({id}) => {
  const [showYesNo, setShowYesNo] = useState(false);
  const dispatch = useDispatch();
  const deleteComponent = () => dispatch(actions.component.deleteComponent(id));

  useEffect(() => {
    setShowYesNo(false);
  }, [id]);

  const cancelDelete = () => setShowYesNo(false);
  const doDelete = () => {
    deleteComponent();
    setShowYesNo(false);
  };

  return (
    <div>
      <div onClick={() => setShowYesNo(!showYesNo)} className={`${commonStyle.toolbar_button} ${styles.icon}`}>
        <FaTrashAlt />
      </div>
      {showYesNo && <YesNo onYes={doDelete} onNo={cancelDelete} />}
    </div>
  )
};
  
export default Delete;
