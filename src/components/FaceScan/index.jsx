import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
  ActivityIndicator,
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
import ImageCropPicker from 'react-native-image-crop-picker';
import api from '../../api/api';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import withAlert from '../AlertBox/withAlert';
import {Images} from '../../utils/images';
import fontSizes from '../../configs/fontSizes';
import colors from '../../configs/colors';
import Button from '../Button';

const FaceScan = ({visible, onClose, showAlert}) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');

  const [isLoading, setIsLoading] = useState(false);
  const [detectedData, setdetectedData] = useState(null);

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={[globalStyle.container, styles.container]}>
        {detectedData ? (
          <Screen2 detectedData={detectedData} againScanNow={() => setdetectedData(null)} />
        ) : (
          <Screen1
            saveDetectedResult={setdetectedData}
            setIsLoading={setIsLoading}
            cameraPermissionStatus={cameraPermissionStatus}
            setCameraPermissionStatus={setCameraPermissionStatus}
            showAlert={showAlert}
          />
        )}
      </ImageBackground>
      <TouchableOpacity onPress={onClose} style={styles.arrowBack}>
        <FontAwesome name="close" color="#fff" size={20} />
      </TouchableOpacity>

      {isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      )}
    </Modal>
  );
};

const Screen1 = ({
  showAlert,
  saveDetectedResult,
  setIsLoading,
  cameraPermissionStatus,
  setCameraPermissionStatus,
}) => {
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

  const openPicker = async () => {
    try {
      const res = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        multiple: false,
        mediaType: 'photo',
        cropping: true,
      });
      console.log('RES:--->', res);
      setIsLoading(true);
      const formData = new FormData();
      let imageInFormData = {
        uri: res?.path,
        type: res?.mime,
        name: res?.filename || 'image.png',
      };
      console.log(imageInFormData);
      formData.append('image', imageInFormData);
      console.log('FORMDATA', formData);
      const detectRes = await api.detectEmotion(formData);

      // const response = await fetch('https://oarfish-obliging-rooster.ngrok-free.app/analyze_emotion', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // const detectRes = await response.json();
      console.log('detectRes', detectRes);
      saveDetectedResult(detectRes);
    } catch (error) {
      console.log('error', error?.message);
      showAlert('Error', error?.message || error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.cameraFrame}>
        {cameraPermissionStatus === 'granted' && (
          <Camera
            style={styles.FaceScan}
            device={device}
            isActive={true}
            resizeMode="cover"
          />
        )}
        <View style={styles.noCameraAccess}>
          <TouchableOpacity onPress={requestCameraPermission}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              We can't access your camera
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.msgText}>Point your Face in the frame</Text>
      <Image
        style={styles.wave}
        source={require('../../assets/images/waves.png')}
      />
      <TouchableOpacity onPress={openPicker}>
        <Text style={styles.btnText}>Select from Photos</Text>
      </TouchableOpacity>
    </>
  );
};

const Screen2 = ({detectedData, againScanNow}) => {
  const {Angry, Sad, Disgust, Neutral, Surprise, Happy} = Images;

  const dic = {
    angry: Angry,
    sad: Sad,
    disgust: Disgust,
    neutral: Neutral,
    surprise: Surprise,
    happy: Happy,
  };

  return (
    <View
      style={[globalStyle.container, {marginTop: 40, alignItems: 'center'}]}>
      <Text style={{color: 'white', fontSize: fontSizes.text2}}>
        Your Face Emotion is:
      </Text>
      <View style={{marginVertical: 20}}>
        <Image
          source={dic[`${detectedData?.emotions?.[0].dominant_emotion}`]}
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{color: 'white', fontSize: fontSizes.text2, marginTop: 10, textAlign: "center"}}>
          {detectedData?.emotions?.[0].dominant_emotion}
        </Text>
      </View>

          <View style={{alignItems: "center", marginTop: 20}}>
            <Text style={{color: 'white', fontSize: fontSizes.text2}}>If you think this is incorrect:</Text>
            {/* <TouchableOpacity onPress={againScanNow} style={{backgroundColor: colors.PRIMARY, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 40, marginTop: 10}}>
              <Text style={{color: 'white', fontSize: fontSizes.text2}}>Again Detect Now</Text>
            </TouchableOpacity> */}
            <Button 
              text={"Again Detect Now"}
              onPress={againScanNow}
              style={{paddingHorizontal: 20, paddingVertical: 10, width: "auto", marginTop: 10}}
            />
          </View>
    </View>
  );
};

export default withAlert(FaceScan);
