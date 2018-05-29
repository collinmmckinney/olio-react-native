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
            const { data } = action.payload;
            if (data && data.DailyForecasts && data.DailyForecasts.length > 0) {
                const lastUpdated = updatedState.dailyLastUpdated;
                if (!lastUpdated || lastUpdated < Date.now() - (1000 * 60 * 60)) {
                    updatedState.dailyForecasts = data.DailyForecasts.map((forecast) => {
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
            } else {
                updatedState.dailyForecasts = [
                    {
                        date: new Date().setDate(new Date().getDate() + 0),
                        airQuality: 'Good',
                        grass: 'Low',
                        mold: 'Low',
                        ragweed: 'Low',
                        tree: 'High',
                        windDirection: 'S'
                    },
                    {
                        date: new Date().setDate(new Date().getDate() + 1),
                        airQuality: 'Good',
                        grass: 'Low',
                        mold: 'Low',
                        ragweed: 'Low',
                        tree: 'High',
                        windDirection: 'S'
                    },
                    {
                        date: new Date().setDate(new Date().getDate() + 2),
                        airQuality: 'Good',
                        grass: 'Low',
                        mold: 'Low',
                        ragweed: 'Low',
                        tree: 'High',
                        windDirection: 'S'
                    },
                    {
                        date: new Date().setDate(new Date().getDate() + 3),
                        airQuality: 'Good',
                        grass: 'Low',
                        mold: 'Low',
                        ragweed: 'Low',
                        tree: 'High',
                        windDirection: 'S'
                    },
                    {
                        date: new Date().setDate(new Date().getDate() + 4),
                        airQuality: 'Good',
                        grass: 'Low',
                        mold: 'Low',
                        ragweed: 'Low',
                        tree: 'High',
                        windDirection: 'S'
                    }
                ];
                updatedState.town = 'Hanover';
            }
            break;
        }
        case RECEIVE_HOURLY_WEATHER: {
            const { data } = action.payload;
            if (data && data.length > 0) {
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
            } else {
                updatedState.hourlyForecasts = [
                    {
                        date: new Date().setHours(new Date().getHours() + 0),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 1),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 2),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 3),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 4),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 5),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 6),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 7),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 8),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 9),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 10),
                        temperature: 80,
                        humidity: 10
                    },
                    {
                        date: new Date().setHours(new Date().getHours() + 11),
                        temperature: 80,
                        humidity: 10
                    }
                ];
                updatedState.town = 'Hanover';
            }
            break;
        }
        default:
    }
    return updatedState;
}
