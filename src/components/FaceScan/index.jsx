import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './style';
import globalStyle from '../../configs/globalStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
} from 'react-native-vision-camera';

const FaceScan = ({visible, onClose}) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const device = useCameraDevice('front');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    // if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);


  useEffect(() => {
    requestCameraPermission();
  }, [cameraPermissionStatus]);

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground source={require('../../assets/images/bg.png')} style={[globalStyle.container, styles.container]}>
        <View style={styles.cameraFrame}>
          {cameraPermissionStatus === 'granted' && <Camera
            style={styles.FaceScan}
            device={device}
            isActive={true}
            resizeMode='cover'
          />}
        </View>

        <Text style={styles.msgText}>Point your Face in the frame</Text>
        <Image
          style={styles.wave}
          source={require('../../assets/images/waves.png')}
        />
        <TouchableOpacity>
          <Text style={styles.btnText}>Select from Photos</Text>
        </TouchableOpacity>
      </ImageBackground>

      <TouchableOpacity onPress={onClose} style={styles.arrowBack}>
        <FontAwesome name="close" color="#fff" size={20} />
      </TouchableOpacity>
    </Modal>
  );
};

export default FaceScan;
