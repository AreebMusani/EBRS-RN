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
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from '../SelectDropdown';
import {emotionDropdownList} from '../../constants/list.constants';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../configs/toastConfig';

const FaceScan = ({visible, onClose, showAlert, navigation}) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');

  const [isLoading, setIsLoading] = useState(false);
  const [detectedData, setdetectedData] = useState(null);
  const [userImage, setuserImage] = useState(null);

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={[globalStyle.container, styles.container]}>
        {detectedData ? (
          <Screen2
            onClose={onClose}
            image={userImage}
            detectedData={detectedData}
            navigation={navigation}
            againScanNow={() => setdetectedData(null)}
          />
        ) : (
          <Screen1
            onClose={onClose}
            saveDetectedResult={setdetectedData}
            setIsLoading={setIsLoading}
            cameraPermissionStatus={cameraPermissionStatus}
            setCameraPermissionStatus={setCameraPermissionStatus}
            showAlert={showAlert}
            navigation={navigation}
            setuserImage={setuserImage}
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

      <Toast config={toastConfig} />
    </Modal>
  );
};

const Screen1 = ({
  showAlert,
  saveDetectedResult,
  setIsLoading,
  cameraPermissionStatus,
  setCameraPermissionStatus,
  setuserImage,
  onClose,
  navigation,
}) => {
  const camera = useRef(null);
  const device = useCameraDevice('front');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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
      setuserImage(imageInFormData?.uri);
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

  const takePhoto = async () => {
    try {
      setIsLoading(true);
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
        // flash: 'auto',
        enableAutoRedEyeReduction: true,
        enableAutoStabilization: true,
      });
      const formData = new FormData();
      let imageInFormData = {
        uri: `file://${photo?.path}`,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      setuserImage(imageInFormData?.uri);
      console.log(photo);
      // console.log(imageInFormData);
      formData.append('image', imageInFormData);
      console.log('FORMDATA', formData);
      const detectRes = await api.detectEmotion(formData);
      console.log('Photo:', photo);
      console.log(detectRes);
      saveDetectedResult(detectRes);
    } catch (error) {
      console.error('Error taking photo or sending to API:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error details:', error.message);
      }
      console.error('Error config:', error.config);
      showAlert('Error', error?.message || error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSongs = () => {
    if (!value) {
      Toast.show({
        type: 'error',
        text1: 'Please select an emotion from dropdown...',
      });
      return;
    }
    onClose();
    navigation.navigate('Home', {
      emotion: value,
    });
    setValue(null);
  };

  return (
    <>
      <View style={styles.cameraFrame}>
        {cameraPermissionStatus === 'granted' && (
          <Camera
            ref={camera}
            photo={true}
            style={styles.FaceScan}
            device={device}
            isActive={true}
            orientation="portrait"
            outputOrientation="preview"
            resizeMode="cover"
            photoQualityBalance="speed"
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
      <TouchableOpacity
        onPress={takePhoto}
        style={{
          marginTop: 10,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome name="camera" color="#000" size={25} onPress={takePhoto} />
      </TouchableOpacity>
      <Image
        style={styles.wave}
        source={require('../../assets/images/waves.png')}
      />
      <TouchableOpacity onPress={openPicker}>
        <Text style={styles.btnText}>Select from Photos</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          width: '100%',
          // gap: 0,
          // borderWidth: 3,
          // borderColor: "#fff",
          // borderRadius: 10,
          // backgroundColor: "#fff",
          padding: 0,
          margin: 0
        }}>
        <SelectDropdown
          placeholder="Select an emotion"
          value={value}
          setValue={setValue}
          open={open}
          setOpen={setOpen}
          options={emotionDropdownList}
          style={{
            borderWidth: 0,
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          containerStyle={{
            elevation: 5,
            flexShrink: 0,
            flexBasis: '80%',
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 0,
            margin: 0,
          }}
        />
        <TouchableOpacity
          onPress={handleGetSongs}
          style={{
            backgroundColor: colors.PRIMARY,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <FontAwesome name="arrow-right" color={colors.TEXT} size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const Screen2 = ({detectedData, againScanNow, navigation, onClose, image}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Angry', value: 'angry'},
    {label: 'Sad', value: 'sad'},
    {label: 'Neutral', value: 'neutral'},
    {label: 'Fear', value: 'fear'},
  ]);

  const {Angry, Sad, Disgust, Neutral, Surprise, Happy, Fear} = Images;

  const dic = {
    angry: Angry,
    sad: Sad,
    disgust: Disgust,
    neutral: Neutral,
    surprise: Surprise,
    happy: Happy,
    fear: Fear,
  };

  const emotion = ['happy', 'sad', 'fear', 'angry'].includes(
    (detectedData?.emotions?.[0]?.dominant_emotion).toLowerCase(),
  )
    ? detectedData?.emotions?.[0]?.dominant_emotion
    : 'neutral';

  const handleGetSongs = () => {
    onClose();
    navigation.navigate('Home', {
      emotion: value ? value : emotion,
    });
    againScanNow();
  };

  return (
    <View
      style={[globalStyle.container, {marginTop: 40, alignItems: 'center'}]}>
      <Text style={{color: 'white', fontSize: fontSizes.text2}}>
        Your Face Emotion is:
      </Text>
      <View style={{marginVertical: 20}}>
        <Image
          source={{uri: image}}
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: fontSizes.text2,
            marginTop: 10,
            textAlign: 'center',
          }}>
          {emotion}
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{color: 'white', fontSize: fontSizes.text2}}>
          If you think this is incorrect:
        </Text>
        <SelectDropdown
          placeholder="Select an emotion"
          value={value}
          setValue={setValue}
          open={open}
          setOpen={setOpen}
          options={emotionDropdownList}
          style={{
            marginVertical: 10,
            borderWidth: 4,
            elevation: 5,
            borderColor: colors.PRIMARY,
          }}
        />
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select an emotion"
          style={{
            marginVertical: 10,
            borderWidth: 4,
            elevation: 5,
            borderColor: colors.PRIMARY,
          }}
        /> */}
        <Text style={{fontSize: 14, color: '#fff', marginVertical: 10}}>
          OR
        </Text>
        <Button
          text={'Again Detect Now'}
          onPress={againScanNow}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: 'auto',
            marginTop: 10,
          }}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          text={'Get recommended Songs'}
          onPress={handleGetSongs}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: 'auto',
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
};

export default withAlert(FaceScan);
