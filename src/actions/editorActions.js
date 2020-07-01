import { EDIT_COMPONENT, CANCEL_EDITION } from '../constants/action-types'; 

const editComponent = (id) => {
  return { 
    type: EDIT_COMPONENT,
    id
  };
};

const cancelEdition = () => {
  return {
    type: CANCEL_EDITION
  };
};

export default {
  editComponent,
  cancelEdition
}
