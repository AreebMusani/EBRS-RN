import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalWrapper: (justifyContent, marginHorizontail) => ({
    flex: 1,
    justifyContent: justifyContent,
    margin: 0,
    marginHorizontal: marginHorizontail,
  }),
});

export default styles;
