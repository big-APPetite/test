/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {decode, encode} from 'base-64';

global.btoa = encode;

global.atob = decode;

AppRegistry.registerComponent(appName, () => App);
