import { AsyncStorage } from "react-native"
import { Permissions, Notifications } from 'expo'

export const CARD_STORAGE_KEY = 'cardnew'
export const NOTIFICATION_KEY = 'FlashCards:notifications'

export async function getKey(item) {
    try {
        const value = await AsyncStorage.getItem(item)
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

export function getBaralhos() {

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