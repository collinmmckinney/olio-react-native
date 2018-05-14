import { RECEIVE_AIR_QUALITY, RECEIVE_AIR_QUALITY_FORECAST } from '../actions/airQuality';

const initialState = {
    locationCity: null,
    locationState: null,
    current: {
        quality: 'Unknown'
    },
    forecasts: [],
    error: null
};

export default function AirQuality(state = initialState, action) {
    const updatedState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_AIR_QUALITY: {
            updatedState.current = {
                quality: action.payload.data[0].Category.Name
            };
            break;
        }
        case RECEIVE_AIR_QUALITY_FORECAST: {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const forecasts = action.payload.data.map(forecast => ({
                dayOfTheWeek: days[new Date(forecast.DateForecast).getDay()],
                quality: forecast.Category.Name
            }));
            updatedState.forecasts = forecasts;
            break;
        }
        default:
    }
    return updatedState;
}
