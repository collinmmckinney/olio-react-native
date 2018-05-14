export const FETCH_AIR_QUALITY = 'FETCH_AIR_QUALITY';
export const REQUEST_AIR_QUALITY = 'REQUEST_AIR_QUALITY';
export const RECEIVE_AIR_QUALITY = 'RECEIVE_AIR_QUALITY';
export const FETCH_AIR_QUALITY_FORECAST = 'FETCH_AIR_QUALITY_FORECAST';
export const REQUEST_AIR_QUALITY_FORECAST = 'REQUEST_AIR_QUALITY_FORECAST';
export const RECEIVE_AIR_QUALITY_FORECAST = 'RECEIVE_AIR_QUALITY_FORECAST';

function requestAirQuality() {
    return {
        type: REQUEST_AIR_QUALITY
    };
}

function receiveAirQuality(data) {
    return {
        type: RECEIVE_AIR_QUALITY,
        payload: { data }
    };
}

export function fetchAirQuality(latitude, longitude) {
    return (dispatch) => {
        dispatch(requestAirQuality());
        return fetch(`https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${latitude}&longitude=${longitude}&API_KEY=4EED7A71-03D6-4958-B0C9-AE13F7BE4BB2`)
            .then(response => response.json())
            .then(json => dispatch(receiveAirQuality(json)))
            .catch(error => console.log(error));
    };
}

function requestAirQualityForecast() {
    return {
        type: REQUEST_AIR_QUALITY_FORECAST
    };
}

function receiveAirQualityForecast(data) {
    return {
        type: RECEIVE_AIR_QUALITY_FORECAST,
        payload: { data }
    };
}

export function fetchAirQualityForecast(latitude, longitude) {
    return (dispatch) => {
        dispatch(requestAirQualityForecast());
        return fetch(`https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${latitude}&longitude=${longitude}&API_KEY=4EED7A71-03D6-4958-B0C9-AE13F7BE4BB2`)
            .then(response => response.json())
            .then(json => dispatch(receiveAirQualityForecast(json)))
            .catch(error => console.log(error));
    };
}
