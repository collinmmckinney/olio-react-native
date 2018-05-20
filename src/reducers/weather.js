import { RECEIVE_DAILY_WEATHER, RECEIVE_HOURLY_WEATHER } from '../actions/weather';

const initialState = {
    town: null,
    hourlyForecasts: [],
    hourlyLastUpdated: null,
    dailyForecasts: [],
    dailyLastUpdated: null,
    error: null
};

export default function Weather(state = initialState, action) {
    const updatedState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_DAILY_WEATHER: {
            const lastUpdated = updatedState.dailyLastUpdated;
            if (!lastUpdated || lastUpdated < Date.now() - (1000 * 60 * 60)) {
                updatedState.dailyForecasts = action.payload.data.DailyForecasts.map((forecast) => {
                    const airAndPollen = forecast.AirAndPollen;
                    const airQuality = airAndPollen.find(item => item.Name === 'AirQuality').Category;
                    const grass = airAndPollen.find(item => item.Name === 'Grass').Category;
                    const mold = airAndPollen.find(item => item.Name === 'Mold').Category;
                    const ragweed = airAndPollen.find(item => item.Name === 'Ragweed').Category;
                    const tree = airAndPollen.find(item => item.Name === 'Tree').Category;
                    return {
                        date: forecast.Date,
                        airQuality,
                        grass,
                        mold,
                        ragweed,
                        tree,
                        windDirection: forecast.Day.Wind.Direction.English
                    };
                });
                updatedState.dailyLastUpdated = Date.now();
                updatedState.town = action.payload.town;
            }
            break;
        }
        case RECEIVE_HOURLY_WEATHER: {
            const lastUpdated = updatedState.hourlyLastUpdated;
            if (!lastUpdated || lastUpdated < Date.now() - (1000 * 60 * 60)) {
                updatedState.hourlyForecasts = action.payload.data.map(forecast => ({
                    date: forecast.DateTime,
                    temperature: forecast.Temperature.Value,
                    humidity: forecast.RelativeHumidity
                }));
                updatedState.hourlyLastUpdated = Date.now();
                updatedState.town = action.payload.town;
            }
            break;
        }
        default:
    }
    return updatedState;
}
