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

    console.log('card:', card)

    let storage = getItem(CARD_STORAGE_KEY)

    console.log('storagestoragestoragestorage:', storage)
    if (storage === undefined) {
        storage = {}
    }

    console.log('')
    console.log('BEFORE ', storage)

    storage = {
        ...storage,
        ...card
    }

    console.log('AFTER ', storage)

    setItem(CARD_STORAGE_KEY, storage)

}

export async function getKey(item) {
    console.log("getKey dentro:", item);
    try {
        const value = await AsyncStorage.getItem(item)
        console.log("value:" + value);

    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

export async function saveKey(value, card) {
    console.log('Save:', value, card)

    try {
       await AsyncStorage.mergeItem(card, JSON.stringify(value));
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

export async function getCards() {

    const arrayAndre = []
    const andreMap = new Map()
    await AsyncStorage.getAllKeys().then((storage)=> {
        storage.forEach(async k => {
            const value = await AsyncStorage.getItem(k).then((value)=> {
                console.log(k);
                console.log(value);
                arrayAndre.push( JSON.parse(value))
                andreMap.set(k,value)
                console.log('sss', JSON.parse(value));
                  
            });
           
            return andreMap
        });
    })

    // storage.forEach(async k => {
    //     const value = await AsyncStorage.getItem(k).then((value)=> {
    //         console.log(k);
    //         console.log(value);
    //         arrayAndre.push({ key , value})
    //     });
    // });

    // console.log('arrayAndre ', arrayAndre)

    // console.log('getCards ', storage)
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
