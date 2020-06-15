import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height,
    backgroundColor: 'orange',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  touch: {
    width: 100,
    height: 40,
    borderRadius: 2,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 40,
    backgroundColor: 'black',
    color: 'white',
    fontSize: 20,
  },
});

export default styles;
