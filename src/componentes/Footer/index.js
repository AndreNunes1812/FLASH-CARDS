import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

export default class Footer extends Component {

    render() {

        return (
            <View>
                <View style={styles.box1}>
                    <TouchableOpacity  onPress={() => this.props.navegacao.navigation.navigate('Baralho')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> ADCIONAR BARALHO</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    box1: {
        backgroundColor: '#2196F3',
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
    ,
    texto: {
        color: 'white',
        backgroundColor: '#2196F3',
        fontSize: 20,
        paddingTop: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 10,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',
    },
    buttonText: {
        justifyContent: 'center',
        color: 'white',
    }
})