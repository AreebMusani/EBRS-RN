import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../configs/globalStyle';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FaceScan = ({visible, onClose}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={[globalStyle.container, styles.container]}>
        <View style={styles.cameraFrame}>
          <View style={{backgroundColor: "pink", ...StyleSheet.absoluteFill, flex: 1}} />
        </View>

        <Text style={styles.msgText}>Point your Face in the frame</Text>
        <Image
          style={styles.wave}
          source={require('../../assets/images/waves.png')}
        />
        <TouchableOpacity>
          <Text style={styles.btnText}>Select from Photos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onClose} style={styles.arrowBack}>
        <FontAwesome name="close" color="#fff" size={20} />
        </TouchableOpacity>
    </Modal>
  );
};

export default FaceScan;
