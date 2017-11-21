import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../store/modals/actions';
import Modal from '../../components/shared/Modal';

const Confirmation = ({open, title, onConfirm, hideModal }) => {
  const handleConfirm = (isConfirmed) => () => {
    hideModal();
    onConfirm(isConfirmed);
  };

  return (
    <Modal open={open} title={title}>
      <button onClick={handleConfirm(true)}>
        Yes
      </button>
      <button onClick={handleConfirm(false)}>
        No
      </button>
    </Modal>
  );
};

export default connect(null, { hideModal })(Confirmation);