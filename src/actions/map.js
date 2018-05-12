export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SET_MAP_REGION = 'SET_MAP_REGION';
export const SELECT_ALLERGEN_TYPE = 'SELECT_ALLERGEN_TYPE';

export function setUserLocation(location) {
    return {
        type: SET_USER_LOCATION,
        payload: { location }
    };
}

export function setMapRegion(region) {
    return {
        type: SET_MAP_REGION,
        payload: { region }
    };
}

export function selectAllegenType(allergenType) {
    return {
        type: SELECT_ALLERGEN_TYPE,
        payload: { allergenType }
    };
}
