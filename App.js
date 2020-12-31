import React from 'react';
import {View} from 'react-native';
import InputField from './src/components/InputField/InputField';

export default function App() {
  return (
    <View style={{padding: 20}}>
      <InputField
        numbers={4}
        UpperCase={3}
        onChangeText={(text) => console.log(text)}
      />
    </View>
  );
}
