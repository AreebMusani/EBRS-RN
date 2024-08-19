import React from 'react';
import Modal from 'react-native-modal';
import styles from './Modal.style';

export const ModalComponent = ({
  open,
  setOpen,
  childern,
  justifyContent = 'center',
  marginHorizontail = 20,
  avoidKeyboard = true,
  swipeDirection = 'down',
}) => {
  return (
    <Modal
      isVisible={open}
      avoidKeyboard={avoidKeyboard}
      backdropColor="#848484A1"
      onBackdropPress={() => {
        setOpen(false);
      }}
      swipeDirection={swipeDirection}
      style={styles.modalWrapper(justifyContent, marginHorizontail)}
      hasBackdrop>
      {childern}
    </Modal>
  );
};
