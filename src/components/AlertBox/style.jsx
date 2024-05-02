import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../configs/colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  //  MODAL START
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 9999999
  },

  modalView: {
    // margin: 20,
    borderRadius: 10,
    // overflow: 'hidden',
    // padding: 35,
    width: width * 0.8,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  ModalHead: {
    color: '#fff',
    width: '100%',
    backgroundColor: "rgba(50, 49, 99, 1)",
    // textAlign: 'center',
    paddingVertical: '4%',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  ModalContent: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    textAlign: "center"
  },

  ModalMsg: {
    fontSize: 18,
    // fontWeight: 'bold',
    // textAlign: 'center',
    color: '#000',
  },

  modalClose: {
    position: 'absolute', 
    right: 10, 
    top: -10,
    backgroundColor: "#fff",
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  }
  //  MODAL END
});

export default styles;
