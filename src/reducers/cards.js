import { ADD_CARD, GET_CARDS } from '../actions/cards'
import { AsyncStorage } from 'react-native'

cards = new Array()

addCardStorage = async(card, cards) => {
    console.log('addCardStorage:', card , cards)
    try {
        cards.push(card)
        await AsyncStorage.setItem('@MySuperStore:cards', JSON.stringify(cards));
    } catch (error) {
    }
}

export default function index (state = [] , action  ) {
    console.log('reducers ')
    switch (action.type) {
       
        case ADD_CARD:
           console.log('reducers cards:', action)
           addCardStorage (action.card , cards)
            return [ ...state ,  {  
                card: action.card,
            }]   

        case GET_CARDS:
            console.log('GET CARDS NO REDUCER:', action.card)
            
             return [ ...state ,  {  
                 card: action.card,
             }]   
 
        case 'SET_CARDS':
            return action.cards;
        default:
            console.log('default ok:', action)
            return state;
    }
}