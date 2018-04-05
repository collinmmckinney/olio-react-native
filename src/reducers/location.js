import { SET_LOCATION } from '../actions/location';

const initialState = {
    location: {
        timestamp: null,
        coords: {
            accuracy: null,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 37.78825,
            longitude: -122.4324,
            speed: null
        }
    }
};

export default function Location(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATION:
            return Object.assign({}, state, { location: action.payload.location });
        default:
            return state;
    }
}
