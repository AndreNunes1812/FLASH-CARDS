import React, { Component } from 'react'
import { clearLocalNotification, setLocalNotification } from '../Storage'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'

class FinalizarQuiz extends Component {

    componentDidMount() {
        clearLocalNotification()
        .then(setLocalNotification)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.textoObrigado}>Obrigado!</Text>
                </View>
                <View><Text style={styles.texto}>Você respondeu {this.props.navigation.state.params.navegacao.numQuestao } questão(oes)</Text></View>
                <View style={styles.resultBottom}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#fff'}]} onPress={() => {this.props.navigation.navigate('BaralhoIndividual')}}>
                        <Text style={[styles.buttonText, {color: '#000'}]}>Iniciar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#000'}]}>
                        <Text style={[styles.buttonText, {color: '#fff'}]} onPress={() => {this.props.navigation.navigate('Montagem')}}>Retornar Baralho(s)</Text>
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
        justifyContent: 'center',
        alignContent: 'center'
    },

    textoObrigado: {
        textAlign: 'center',
        margin: 20,
        height: 48,
        fontSize: 27,
        fontWeight: 'bold'
    },
    texto: {
        textAlign: 'center',
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    submit:{
        marginRight:20,
        marginLeft:20,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#2196F3',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    submitText:{
        color:'#fff',
        textAlign:'center',
    },
    button: {
        padding: 20,
        margin: 10,
        marginLeft: 60,
        marginRight: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    percentageHolder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
    },
    percentage: {
        fontSize: 130,
        color: '#000',
         textAlign: 'center',
    },
    resultBottom: {
        marginTop: 30,
    }
})

export default FinalizarQuiz