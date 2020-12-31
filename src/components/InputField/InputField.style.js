import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    letterSpacing: 2,
    width: '100%',
  },
  state: {
    backgroundColor: '#FFE1D7',
    height: 6,
    borderRadius: 6,
    marginTop: 6,
    width: '100%',
    maxWidth: '100%',
  },
  stateSuccess: {
    backgroundColor: '#8AE36F',
    height: 6,
    borderRadius: 6,
    marginTop: 6,
    position: 'relative',
    zIndex: 1,
    transform: [{translateY: -12}],
    maxWidth: '100%',
  },
});
