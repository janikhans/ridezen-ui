import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideModal } from '../../store/modals/actions';
import Modal from '../../components/shared/Modal';

const Notification = ({ title, hideModal }) => {
  const handleClose = () => () => {
    hideModal();
  };
  
  return (
    <Modal title={title}>
      <button onClick={handleClose()}>
        Ok
      </button>
    </Modal>
  );
};

Notification.propTypes = {
  title: PropTypes.string
};

export default connect(null, { hideModal })(Notification);