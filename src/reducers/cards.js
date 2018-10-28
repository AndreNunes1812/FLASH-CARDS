import { ADD_CARD, SET_CARDS } from '../actions/cards'

export default function index(state = [], action) {

    switch (action.type) {
        case SET_CARDS:
            console.log('SET CARDS NO REDUCER:', action.cards)

            if (action.cards !== undefined) {
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