export const ADD_BUBBLES = 'ADD_BUBBLES';
export const DELETE_BUBBLE = 'DELETE_BUBBLE';
export const ADD_SUB_BUBBLES = 'ADD_SUB_BUBBLES';
export const SET_ARRANGE_MODE = 'SET_ARRANGE_MODE';
export const UPDATE_BUBBLE_LOCATION = 'UPDATE_BUBBLE_LOCATION';
export const RESIZE_BUBBLE = 'RESIZE_BUBBLE';
export const SELECT_BUBBLE = 'SELECT_BUBBLE';

export function addBubbles(bubbles) {
    return {
        type: ADD_BUBBLES,
        payload: { bubbles }
    };
}

export function deleteBubble(id) {
    return {
        type: DELETE_BUBBLE,
        payload: { id }
    };
}

export function addSubBubbles(parentBubbleId, subBubbles) {
    return {
        type: ADD_SUB_BUBBLES,
        payload: { parentBubbleId, subBubbles }
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

export function selectBubble(id) {
    return {
        type: SELECT_BUBBLE,
        payload: { id }
    };
}
