import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, TextInput, View} from 'react-native';
import {style} from './InputField.style';

const {width} = Dimensions.get('screen');

export default function InputField({
  numbers,
  UpperCase,
  onChangeText,
  styleInput,
  ...props
}) {
  const [state, setState] = useState({
    upperCase: UpperCase,
    progress: 0,
    total: 4,
    number: numbers,
    characters: 2,
    letter: 3,
    numberValidate: false,
    upperCaseValidate: false,
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
    if (length >= state.characters && !state.charactersValidate) {
      setState({
        ...state,
        progress: state.progress + 1,
        charactersValidate: true,
      });
    } else if (length < state.characters && state.charactersValidate) {
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
    if (length >= state.upperCase && !state.upperCaseValidate) {
      setState({
        ...state,
        progress: state.progress + 1,
        upperCaseValidate: true,
      });
    } else if (length < state.upperCase && state.upperCaseValidate) {
      setState({
        ...state,
        progress: state.progress - 1,
        upperCaseValidate: false,
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
    <View
      style={{
        flexWrap: 'wrap',
      }}>
      <TextInput
        {...props}
        style={{...style.input}}
        secureTextEntry={true}
        onChangeText={(text) => handleValidate(text)}
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
