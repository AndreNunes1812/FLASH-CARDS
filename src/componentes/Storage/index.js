import { AsyncStorage } from "react-native"
import { Permissions, Notifications } from 'expo'

export const CARD_STORAGE_KEY = 'cardnew'
export const NOTIFICATION_KEY = 'FlashCards:notifications'


//let database = {}

// function getItem($key) {
//     return database[$key] ? database[$key] : undefined;
// }

// function setItem($key, data) {
//     database[$key] = data;
// }

// export function setCard(card) {

//     let storage = getItem(CARD_STORAGE_KEY)

//     if (storage === undefined) {
//         storage = {}
//     }

//     storage = {
//         ...storage,
//         ...card
//     }

//     setItem(CARD_STORAGE_KEY, storage)

// }

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

export function saveDeckTitle(title) {
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

export function getDeck(id) {
    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
        .then(decks => decks[id] || {})
}

export function addCardToDeck(title, card) {
    console.log('addCardToDeck:', title, card)
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


// export async function saveKey(value, card) {
//     // console.log('Save:', value, card)

//     try {
//        await AsyncStorage.mergeItem(card, JSON.stringify(value));
//     } catch (error) {
//         console.log("Error saving data" + error);
//     }
// }

export function getCards() {

    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(results => JSON.parse(results) || {})
}

export async function remover(key) {
    return AsyncStorage.getItem(CARD_STORAGE_KEY)

        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
        })
}

export function containsLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(data => JSON.parse(data) !== null)
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(data => JSON.parse(data))
        .then(() => {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync

                        let dateToNotify = new Date()
      
                        dateToNotify.setDate(dateToNotify.getDate() + 1)

                        dateToNotify.setHours(16)
                        dateToNotify.setMinutes(15)

                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: dateToNotify,
                                repeat: 'day',
                            }
                        )
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
        })
}

function createNotification () {
    return {
        title: 'Quiz!',
        body: " Não esqueça do seu quiz para hoje.",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}