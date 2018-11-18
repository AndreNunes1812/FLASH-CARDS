import { SET_CARDS } from '../actions/cards'

export default function index(state = [], action) {

    switch (action.type) {
        case SET_CARDS:
            if (action.cards !== undefined) {
                state = []
                return [...state, {
                    cards: action.cards,
                }]
            } else {
                return state
            }

        default:
            return state;
    }
}