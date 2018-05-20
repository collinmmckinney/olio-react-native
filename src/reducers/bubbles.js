import uuidv4 from 'uuid/v4';
import {
    ADD_BUBBLES,
    DELETE_BUBBLE,
    ADD_SUB_BUBBLES,
    SET_ARRANGE_MODE,
    UPDATE_BUBBLE_LOCATION,
    RESIZE_BUBBLE,
    SELECT_BUBBLE
} from '../actions/bubbles';
import { sizes } from '../style';

const initialState = {
    byId: {},
    selectedBubbleId: null,
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
                    radius: 80,
                    label: '',
                    onPress: () => {},
                    subBubbles: [],
                    ...bubble
                };
                updatedState.byId[id] = newBubble;
            });
            break;
        }
        case DELETE_BUBBLE: {
            delete updatedState.byId[action.payload.id];
            break;
        }
        case ADD_SUB_BUBBLES: {
            const { parentBubbleId, subBubbles } = action.payload;
            const currentSubBubbles = updatedState.byId[parentBubbleId].subBubbles;
            subBubbles.forEach((subBubble) => {
                currentSubBubbles.push(subBubble);
            });
            break;
        }
        case SET_ARRANGE_MODE: {
            Object.keys(updatedState.byId).forEach((id) => {
                if (id !== action.payload.id) {
                    updatedState.byId[id].showSubBubbles = false;
                }
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
        case SELECT_BUBBLE: {
            if (updatedState.selectedBubbleId === action.payload.id) {
                updatedState.selectedBubbleId = null;
            } else {
                updatedState.selectedBubbleId = action.payload.id;
            }
            break;
        }
        default:
    }
    return updatedState;
}
