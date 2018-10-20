import React, { Component } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native'

import ListagemCard from '../ListagemCard/index'
import Footer from '../Footer/index'
import Card from '../Card/index'

import { createStackNavigator } from 'react-navigation'


class Montagem extends Component {

    componentDidMount() {
        debugger
    }

    static navigationOptions = ({ navigation }) => ({

    });
    render() {
        return (
            <View style={styles.container} >
                {/* < Header /> */}
                < ListagemCard navegacao={this.props} />
                < Footer navegacao={this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
})

const MontagemApp = createStackNavigator({
    Montagem: {
        screen: Montagem,
        navigationOptions: ({ navigation }) => ({
            title: 'FLASH-CARDS',
            headerTitleStyle: { color: 'white', },                
            headerStyle: {
                backgroundColor: '#2196F3',
            },
        })
    },
    Card: { screen: Card ,
        navigationOptions: ({ navigation }) => ({
            title: 'Adcionar Card',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: '#2196F3',
            }
        }) },
})

export default MontagemApp;