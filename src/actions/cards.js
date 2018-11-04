export const SET_CARDS = 'SET_CARDS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

export function setCards(cards) {
    // console.log('DISPATCH SETCARDS:', cards )
    return {
        type: SET_CARDS,
        cards: cards
    }
}

export function funcSetCards(cards) {
    // console.log('ACTION FUNCSETCARDS:')
    return dispatch => {
        dispatch( setCards(cards) )
    }    
}