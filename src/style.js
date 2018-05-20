import { Dimensions } from 'react-native';

export const colors = {
    primary: '#3acce1',
    primaryDarker: '#0bafb6',
    primaryDarkest: '#454f63',
    lightGrayText: '#454f63',
    grayText: '#353A50',
    windBlue: '#D7F4FF',
    yellow: '#f3cd31',
    green: '#82a936',
    red: '#f68687'
};

const { height, width } = Dimensions.get('window');
export const sizes = {
    DEVICE_WIDTH: width,
    DEVICE_HEIGHT: height
};
