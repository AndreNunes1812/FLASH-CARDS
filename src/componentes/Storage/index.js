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
    // console.log("getKey dentro:", item);
    try {
        const value = await AsyncStorage.getItem(item)
        console.log("value:" + value);
        return value

    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

export async function saveKey(value, card) {
    // console.log('Save:', value, card)

    try {
       await AsyncStorage.mergeItem(card, JSON.stringify(value));
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

// export  function getCards() {

//     const arrayAndre = []
//     AsyncStorage.getAllKeys().then((storage)=> {
//         storage.forEach( k => {
//             const value = AsyncStorage.getItem(k).then((value)=> {
//                 console.log(k);
//                 console.log(value);
//                //////////// arrayAndre.push( JSON.parse(value))
//                arrayAndre.push( {name: k, title: k , questions: [value]})
//                 //andreMap.set(k,value)
//                 // console.log('sss', JSON.parse(value));
                  
//             });
//              console.log('arrayAndre ', arrayAndre)
//             return arrayAndre
//         });
//     })

//      console.log('arrayAndre saida ', arrayAndre)
//     return arrayAndre //storage
// }

export async function getCards() {

    const arrayAndre = []
    await AsyncStorage.getAllKeys().then((storage)=> {
        storage.forEach(async k => {
            const value = await AsyncStorage.getItem(k).then((value)=> {
                // console.log(k);
                // console.log(value);
               //////////// arrayAndre.push( JSON.parse(value))
               arrayAndre.push( {'name': k, 'title': k , 'questions': [value]})
                //andreMap.set(k,value)
                // console.log('sss', JSON.parse(value));
                  
            });
             console.log('arrayAndre ', arrayAndre)
            return arrayAndre
        });
    })

     console.log('arrayAndre saida ', arrayAndre)
    return arrayAndre //storage
}


export async function remover(key) {

    try {
      return await AsyncStorage.removeItem(key);
    }
    catch (exception) {
        return false;
    }

}
