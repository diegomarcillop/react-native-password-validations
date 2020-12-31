import {AppRegistry} from 'react-native';
import App from './App';
import InputField from './src/components/InputField/InputField';
import {name as appName} from './app.json';
export {InputField};
AppRegistry.registerComponent(appName, () => App);
