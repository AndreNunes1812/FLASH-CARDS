export const SET_CARDS = 'SET_CARDS'

export function setCards(cards) {
    return {
        type: SET_CARDS,
        cards: cards
    }
}

export function funcSetCards(cards) {
    return dispatch => {
        dispatch( setCards(cards) )
    }    
}