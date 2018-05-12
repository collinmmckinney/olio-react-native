import { SET_USER_LOCATION, SET_MAP_REGION, SELECT_ALLERGEN_TYPE } from '../actions/map';

const initialState = {
    userLocation: {
        timestamp: null,
        coords: {
            accuracy: null,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: null,
            longitude: null,
            speed: null
        }
    },
    mapRegion: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
    },
    selectedAllergenType: null
};

export default function Map(state = initialState, action) {
    switch (action.type) {
        case SET_USER_LOCATION:
            return Object.assign({}, state, { userLocation: action.payload.location });
        case SET_MAP_REGION:
            return Object.assign({}, state, { mapRegion: action.payload.region });
        case SELECT_ALLERGEN_TYPE:
            return Object.assign({}, state, { selectedAllergenType: action.payload.allergenType });
        default:
            return state;
    }
}
