import React from 'react';
import { connect } from 'react-redux';

import Notification from './notification';
import Confirmation from './confirmation';

import { MODAL_TYPE_NOTIFICATION, MODAL_TYPE_CONFIRMATION } from '../../constants/ModalTypes';

const MODAL_COMPONENTS = {
  [MODAL_TYPE_NOTIFICATION]: Notification,
  [MODAL_TYPE_CONFIRMATION]: Confirmation
};

const ModalRoot = ({open, type, props }) => {
  if (!type) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[type];
  return <ModalComponent open={open} {...props} />;
};

const mapStateToProps = (state) => {
  return {
    open: state.modals.open,
    type: state.modals.type,
    props: state.modals.props
  };
};

export default connect(mapStateToProps)(ModalRoot)