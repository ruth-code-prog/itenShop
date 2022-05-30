import {Dimensions} from 'react-native';

export * from './colors'
export * from './utils'
export * from './fonts'
export * from './constant'
export * from './localStorage'
export * from './dispatch'
export * from './useForm';

export const deviceWidth = () => Dimensions.get('window').width;

export const deviceHeight = () => Dimensions.get('window').height;