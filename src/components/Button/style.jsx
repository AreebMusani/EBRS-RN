import {StyleSheet} from 'react-native';
import colors from '../../configs/colors';

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 20,
    paddingVertical: 15,
    width: '100%',

    borderRadius: 15,
    backgroundColor: '#9668ef',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    width: '100%',
    overflow: 'hidden',
  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default style;
