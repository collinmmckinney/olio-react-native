import uuidv4 from 'uuid/v4';
import { ADD_BUBBLE, SET_ARRANGE_MODE, UPDATE_BUBBLE_LOCATION, TOGGLE_SHOW_SUB_BUBBLES } from '../actions/bubbles';
import { sizes } from '../style';

const initialState = {
    byId: {},
    arrangeMode: false
};

export default function Bubbles(state = initialState, action) {
    const updatedState = Object.assign({}, state);
    switch (action.type) {
        case ADD_BUBBLE: {
            const id = uuidv4();
            const newBubble = {
                id,
                initialX: Math.floor(Math.random() * sizes.DEVICE_WIDTH),
                initialY: Math.floor(Math.random() * sizes.DEVICE_HEIGHT),
                radius: 90,
                label: 'Map',
                subBubbles: [
                    {
                        label: '1',
                    },
                    {
                        label: '2'
                    },
                    {
                        label: '3'
                    },
                    {
                        label: '4'
                    },
                    {
                        label: '5'
                    },
                    {
                        label: '6'
                    },
                    {
                        label: '7'
                    },
                    {
                        label: '8'
                    }
                ],
                showSubBubbles: false
            };
            updatedState.byId[id] = newBubble;
            break;
        }
        case SET_ARRANGE_MODE: {
            Object.keys(updatedState.byId).forEach((id) => {
                updatedState.byId[id].showSubBubbles = false;
            });
            updatedState.arrangeMode = action.payload.arrangeMode;
            break;
        }
        case UPDATE_BUBBLE_LOCATION: {
            updatedState.byId[action.payload.id].initialX = action.payload.x;
            updatedState.byId[action.payload.id].initialY = action.payload.y;
            break;
        }
        case TOGGLE_SHOW_SUB_BUBBLES: {
            updatedState.byId[action.payload.id].showSubBubbles =
                !updatedState.byId[action.payload.id].showSubBubbles;
            break;
        }
        default:
    }
    return updatedState;
}
