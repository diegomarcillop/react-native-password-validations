import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, TextInput, View} from 'react-native';
import {style} from './InputField.style';

const {width} = Dimensions.get('screen');

export default function InputField({
  numbers,
  upperCase,
  onChangeText,
  letters,
  characters,
  styleInput,
  ...props
}) {
  const [state, setState] = useState({
    mayus: upperCase,
    progress: 0,
    total: 4,
    number: numbers,
    characters_: characters,
    letter: letters,
    numberValidate: false,
    mayusValidate: false,
    charactersValidate: false,
    letterValidate: false,
    animated: new Animated.Value(0),
    ref: React.createRef(),
  });

  useEffect(() => {
    Animated.timing(state.animated, {
      toValue: (width / state.total) * state.progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [state.progress]);

  const handleValidate = (value) => {
    handleValidateNumbers(value);
    handleValidateUpperCase(value);
    handleValidateCharacters(value);
    handleValidateLetters(value);
    onChangeText && onChangeText(value);
  };

  const handleValidateLetters = (value) => {
    let newValue = value.split(/[A-Za-z]/).join('');
    let length = value.length - newValue.length;
    if (length >= state.letter && !state.letterValidate) {
      setState({
        ...state,
        progress: state.progress + 1,
        letterValidate: true,
      });
    } else if (length < state.letter && state.letterValidate) {
      setState({
        ...state,
        progress: state.progress - 1,
        letterValidate: false,
      });
    }
  };

  const handleValidateCharacters = (value) => {
    let newValue = value.split(/\W/).join('');
    newValue = newValue.split(/_/).join('');
    let length = value.length - newValue.length;
    if (length >= state.characters_ && !state.charactersValidate) {
      setState({
        ...state,
        progress: state.progress + 1,
        charactersValidate: true,
      });
    } else if (length < state.characters_ && state.charactersValidate) {
      setState({
        ...state,
        progress: state.progress - 1,
        charactersValidate: false,
      });
    }
  };

  const handleValidateUpperCase = (value) => {
    let newValue = value.split(/[A-Z]/).join('');
    let length = value.length - newValue.length;
    if (length >= state.mayus && !state.mayusValidate) {
      setState({
        ...state,
        progress: state.progress + 1,
        mayusValidate: true,
      });
    } else if (length < state.mayus && state.mayusValidate) {
      setState({
        ...state,
        progress: state.progress - 1,
        mayusValidate: false,
      });
    }
  };

  const handleValidateNumbers = (value) => {
    let newValue = value.split(/[0-9]/).join('');
    let length = value.length - newValue.length;
    if (length >= state.number && !state.numberValidate) {
      setState({...state, progress: state.progress + 1, numberValidate: true});
    } else if (length < state.number && state.numberValidate) {
      setState({...state, progress: state.progress - 1, numberValidate: false});
    }
  };

  return (
    <View>
      <TextInput
        style={{...style.input}}
        secureTextEntry={true}
        onChangeText={(text) => handleValidate(text)}
        {...props}
      />
      <View ref={state.ref} style={style.state} />
      <Animated.View
        style={{
          ...style.stateSuccess,
          width: state.animated,
        }}
      />
    </View>
  );
}
