import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  image: {
    width: 94,
    height: 94,
    bottom: -15,
    left: -8,
    borderRadius: 200,
  },
  close: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    zIndex: 1100,
    elevation: 4,
  },
});

export default styles;
