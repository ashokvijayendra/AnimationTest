import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    resizeMode: 'cover',
  },
});

export default styles;
