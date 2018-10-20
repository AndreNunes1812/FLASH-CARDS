export const SET_CARDS = 'SET_CARDS'
export const ADD_CARD = 'ADD_CARD'
export const GET_CARD = 'GET_CARD'
export const GET_CARDS = 'GET_CARDS'
export const REMOVE_CARD = 'REMOVE_CARD'

cards = []

getCardStorage = async() => {
    console.log('getCardStorage:')
    try {
        console.log('getCardStorage AA:')
        data = await AsyncStorage.getItem('@MySuperStore:cards')
        console.log('getCardStorage BB:')
        if (data != null) {
            console.log('getCardStorage CC:')
            this.cards = JSON.parse(data);
            console.log('getCardStorage reducer:', this.cardn)

        }
    } catch (error) {
    }
}

export function setCards(cards) {
    return {
        type: SET_CARDS,
        cards,
    }
}

export function addCard(card) {
    console.log('actions addCard:', card)
    return {
        type: ADD_CARD,
        card: card
    }
}

export function getCards(cards) {
    console.log('DISPATCH GETCARDS:', cards )
    return {
        type: GET_CARDS,
        card: cards
    }
}

export function funcAddCard(card) {
    console.log('fetchCards:', card)
    return dispatch => {
        dispatch( addCard(card) )
    }    
}

export function funcGetCards() {
    console.log('ACTION FUNCGETCARDS:')
    return dispatch => {
        getCardStorage,
        console.log('action PRINT THIS.CARDS:', this.cards)
        dispatch( getCards(this.cards) )
    }
    
}