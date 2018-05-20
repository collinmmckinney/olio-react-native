import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DAY_ARRAY = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thurs',
    'Fri',
    'Sat'
];

export const LABEL_TO_IMAGE = {
    flower: <Ionicons name="md-flower" color="white" />,
    tree: <FontAwesome name="map-marker" color="white" />,
    map: <FontAwesome name="map-marker" color="white" />,
    airQuality: <MaterialCommunityIcons name="weather-fog" color="white" />,
    weather: <Entypo name="cloud" color="white" />,
    household: <Entypo name="home" color="white" />,
    spirometry: <Feather name="wind" color="white" />,
    pollen: <Ionicons name="md-flower" color="white" />,
    treePollen: <MaterialCommunityIcons name="tree" color="white" />,
    shellfish: <MaterialCommunityIcons name="fish" color="white" />,
    add: <Ionicons name="md-add" color="white" />
};
