export const ADD_BUBBLE = 'ADD_BUBBLE';
export const SET_ARRANGE_MODE = 'SET_ARRANGE_MODE';
export const UPDATE_BUBBLE_LOCATION = 'UPDATE_BUBBLE_LOCATION';
export const RESIZE_BUBBLE = 'RESIZE_BUBBLE';
export const TOGGLE_SHOW_SUB_BUBBLES = 'TOGGLE_SHOW_SUB_BUBBLES';

export function addBubble(bubbleType) {
    return {
        type: ADD_BUBBLE,
        payload: { bubbleType }
    };
}

export function setArrangeMode(arrangeMode) {
    return {
        type: SET_ARRANGE_MODE,
        payload: { arrangeMode }
    };
}

export function updateBubbleLocation(id, x, y) {
    return {
        type: UPDATE_BUBBLE_LOCATION,
        payload: { id, x, y }
    };
}

export function resizeBubble(id, delta) {
    return {
        type: RESIZE_BUBBLE,
        payload: { id, delta }
    };
}

export function toggleShowSubBubbles(id) {
    return {
        type: TOGGLE_SHOW_SUB_BUBBLES,
        payload: { id }
    };
}
