export const FETCH_DAILY_WEATHER = 'FETCH_DAILY_WEATHER';
export const REQUEST_DAILY_WEATHER = 'REQUEST_DAILY_WEATHER';
export const RECEIVE_DAILY_WEATHER = 'RECEIVE_DAILY_WEATHER';
export const FETCH_HOURLY_WEATHER = 'FETCH_HOURLY_WEATHER';
export const REQUEST_HOURLY_WEATHER = 'REQUEST_HOURLY_WEATHER';
export const RECEIVE_HOURLY_WEATHER = 'RECEIVE_HOURLY_WEATHER';

function requestDailyWeather() {
    return {
        type: REQUEST_DAILY_WEATHER
    };
}

function receiveDailyWeather(data) {
    return {
        type: RECEIVE_DAILY_WEATHER,
        payload: { data }
    };
}

export function fetchDailyWeather(latitude, longitude) {
    return (dispatch) => {
        dispatch(requestDailyWeather());
        // TODO Load API keys securely
        const apiKey = 'CPS86TRZg7dOzVC7YqPqpaBahB5A2BtU';
        return fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${latitude},${longitude}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(json => fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${json.Key}?details=true&apikey=${apiKey}`)
                .then(response => response.json()))
            .then(json => dispatch(receiveDailyWeather(json)));
    };
}

function requestHourlyWeather() {
    return {
        type: REQUEST_HOURLY_WEATHER
    };
}

function receiveHourlyWeather(data) {
    return {
        type: RECEIVE_HOURLY_WEATHER,
        payload: { data }
    };
}

export function fetchHourlyWeather(latitude, longitude) {
    return (dispatch) => {
        dispatch(requestHourlyWeather());
        // TODO Load API keys securely
        const apiKey = 'CPS86TRZg7dOzVC7YqPqpaBahB5A2BtU';
        return fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${latitude},${longitude}&apikey=${apiKey}`)
            .then(response => response.json())
            .then((json) => {
                return fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${json.Key}?details=true&apikey=${apiKey}`)
                    .then(response => response.json())
            })
            .then(json => dispatch(receiveHourlyWeather(json)));
    };
}
