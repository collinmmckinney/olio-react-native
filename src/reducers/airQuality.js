import { RECEIVE_AIR_QUALITY, RECEIVE_AIR_QUALITY_FORECAST } from '../actions/airQuality';

const initialState = {
    locationCity: null,
    locationState: null,
    current: null,
    forecasts: [],
    error: null
};

export default function AirQuality(state = initialState, action) {
    const updatedState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_AIR_QUALITY: {
            console.log(action);
            break;
        }
        case RECEIVE_AIR_QUALITY_FORECAST: {
            console.log(action);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const data = action.payload.data.map(forecast => ({
                dayOfTheWeek: days[new Date(forecast.DateForecast).getDay()],
                quality: forecast.Category.name
            }));
            updatedState.forecasts = data;
            break;
        }
        default:
    }
    return updatedState;
}
