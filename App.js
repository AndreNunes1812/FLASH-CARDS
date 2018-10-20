import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';

import { View, StyleSheet } from 'react-native';
import Montagem from './src/componentes/Montagem'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container} >
                    < Montagem />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

})