import uuidv4 from 'uuid/v4';
import {
    ADD_BUBBLES,
    SET_ARRANGE_MODE,
    UPDATE_BUBBLE_LOCATION,
    RESIZE_BUBBLE,
    TOGGLE_SHOW_SUB_BUBBLES
} from '../actions/bubbles';
import { sizes } from '../style';

const initialState = {
    byId: {},
    arrangeMode: false
};

export default function Bubbles(state = initialState, action) {
    const updatedState = Object.assign({}, state);
    switch (action.type) {
        case ADD_BUBBLES: {
            action.payload.bubbles.forEach((bubble) => {
                const id = uuidv4();
                const newBubble = {
                    id,
                    initialX: Math.floor(Math.random() * sizes.DEVICE_WIDTH),
                    initialY: Math.floor(Math.random() * (sizes.DEVICE_HEIGHT - 300)),
                    radius: 100,
                    label: bubble.label,
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
            });
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
        case RESIZE_BUBBLE: {
            const { radius } = updatedState.byId[action.payload.id];
            const updatedSize = radius + (action.payload.delta / 2);
            if (updatedSize > 200) {
                updatedState.byId[action.payload.id].radius = 200;
            } else if (updatedSize < 30) {
                updatedState.byId[action.payload.id].radius = 30;
            } else {
                updatedState.byId[action.payload.id].radius = updatedSize;
            }
            break;
        }
        case TOGGLE_SHOW_SUB_BUBBLES: {
            Object.keys(updatedState.byId).forEach((id) => {
                if (id !== action.payload.id) {
                    updatedState.byId[id].showSubBubbles = false;
                }
            });
            updatedState.byId[action.payload.id].showSubBubbles =
                !updatedState.byId[action.payload.id].showSubBubbles;
            break;
        }
        default:
    }
    return updatedState;
}
