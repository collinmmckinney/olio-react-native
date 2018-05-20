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
    flower: <Ionicons name="md-flower" color="white" size={80} />,
    tree: <FontAwesome name="map-marker" color="white" size={80} />,
    shellfish: <Ionicons name="md-flower" color="white" size={80} />,
    map: <FontAwesome name="map-marker" color="white" size={80} />,
    airQuality: <MaterialCommunityIcons name="weather-fog" color="white" size={80} />,
    weather: <Entypo name="cloud" color="white" size={80} />,
    household: <Entypo name="home" color="white" size={80} />,
    spirometry: <Feather name="wind" color="white" size={80} />
};

export const LABEL_TO_SUB_BUBBLE_IMAGE = {
    pollen: <Ionicons name="md-flower" color="white" size={30} />,
    treePollen: <MaterialCommunityIcons name="tree" color="white" size={30} />,
    shellfish: <MaterialCommunityIcons name="fish" color="white" size={30} />,
    add: <Ionicons name="md-add" color="white" size={30} />
};
