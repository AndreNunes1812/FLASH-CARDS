import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import ListagemBaralho from '../ListagemBaralho/index'
import Footer from '../Footer/index'
import Baralho from '../Baralho/index'
import BaralhoIndividual from '../BaralhoIndividual/index'
import PerguntaCard from '../PerguntaCard/index'
import QuizCard from '../QuizCard/index'
import FinalizarQuiz from '../QuizCard/FinalizarQuiz'

import { createStackNavigator } from 'react-navigation'

class Montagem extends Component {

    static navigationOptions = ({ navigation }) => ({});

    render() {
        return (
            <View style={styles.container} >
                < ListagemBaralho navegacao={this.props} montagem={'sim'} />
                < Footer navegacao={this.props} />
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
            title: 'BARALHO',
            headerTitleStyle: { color: 'white', },
            headerStyle: {
                backgroundColor: '#2196F3',
            },          
        })
    },
    BaralhoIndividual: {
        screen: BaralhoIndividual,
        navigationOptions: ({ navigation }) => ({
            title: 'CARTOES',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: '#2196F3',
            }
        })
    },
    Baralho: {
        screen: Baralho,
        navigationOptions: ({ navigation }) => ({
            title: 'ADCIONAR BARALHO',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: '#2196F3',
            }
        })
    },
    PerguntaCard: {
        screen: PerguntaCard,
        navigationOptions: ({ navigation }) => ({
            title: 'ADCIONAR PERGUNTA',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: '#2196F3',
            }            
        })
    },
    QuizCard: {
        screen: QuizCard,
        navigationOptions: ({ navigation }) => ({
            title: 'QUIZ',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: '#2196F3',
            }
        })
    },
    FinalizarQuiz: {
        screen: FinalizarQuiz,
        navigationOptions: ({ navigation }) => ({
            header: null,
        })
    },
})

export default MontagemApp