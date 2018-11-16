import { AsyncStorage } from "react-native"

export const CARD_STORAGE_KEY = 'cardnew'

let database = {}

function getItem($key) {
    return database[$key] ? database[$key] : undefined;
}

function setItem($key, data) {
    database[$key] = data;
}

export function setCard(card) {

    let storage = getItem(CARD_STORAGE_KEY)

    if (storage === undefined) {
        storage = {}
    }

    storage = {
        ...storage,
        ...card
    }

    setItem(CARD_STORAGE_KEY, storage)

}

export async function getKey(item) {
    console.log("getKey dentro:", item);
    try {
        const value = await AsyncStorage.getItem(item)
        console.log("value:" + value);
        return value

    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

export function saveDeckTitle (title) {
    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => {
            decks[title] = {
                'title': title,
                questions: []
            }
            AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(decks))
            return title
        })
}

export function getDeck (id) {
    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => decks[id] || {})
}

export function addCardToDeck (title, card) {
    console.log('addCardToDeck:',title, card)
    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => {
            if (decks[title]) {
                decks[title].questions.push(card)
                AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(decks))
                return title
            }
        })
}


export async function saveKey(value, card) {
    // console.log('Save:', value, card)

    try {
       await AsyncStorage.mergeItem(card, JSON.stringify(value));
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

export function getCards() {

    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
  
    
    // const arrayAndre = []
    // await AsyncStorage.getAllKeys().then((storage)=> {

    //     console.log('storage ', storage)
    //     storage.forEach(async k => {
    //         const value = await AsyncStorage.getItem(k).then((value)=> {
    //             // console.log(k);
    //             // console.log(value);
    //            //////////// arrayAndre.push( JSON.parse(value))
    //            arrayAndre.push( {'name': k, 'title': k , 'questions': [value]} )
    //             //andreMap.set(k,value)
    //             // console.log('sss', JSON.parse(value));
                  
    //         });
    //          console.log('arrayAndre ', arrayAndre)
    //         return arrayAndre
    //     });
    // })

    //  console.log('arrayAndre saida ', arrayAndre)
    // return arrayAndre //storage
}

// export async function remover(key) {

//     try {
//       return await AsyncStorage.removeItem(key);
//     }
//     catch (exception) {
//         return false;
//     }

// }

export async function remover(key) {
return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
    })
}