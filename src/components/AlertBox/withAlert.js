import React, { useState } from 'react';
import AlertBox from './index';
import { Text } from 'react-native';

const withAlert = (WrappedComponent) => {
  return (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const showAlert = (title, message) => {
      setTitle(title);
      setMessage(message);
      setIsVisible(true);
    };

    const hideAlert = () => {
      setIsVisible(false);
    };

    return (
      <React.Fragment>
        <WrappedComponent {...props} showAlert={showAlert} />
        {/* { && ( */}
          <AlertBox isVisible={isVisible} title={title} msg={message} hideAlert={hideAlert} />
        {/* )} */}
      </React.Fragment>
    );
  };
};

export default withAlert;
