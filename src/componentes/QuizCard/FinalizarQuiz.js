import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native'

class FinalizarQuiz extends Component {

    componentDidMount() {
        console.log('FinalizarQuiz componentDidMount:', this.props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.textoObrigado}>Obrigado!</Text>
                </View>
                <View><Text style={styles.texto}>Você respondeu {this.props.navigation.state.params.navegacao.numQuestao } questão(oes)</Text></View>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => null}
                    underlayColor='#fff'>
                    <Text style={styles.submitText} >Iniciar</Text>
                </TouchableHighlight>
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
        //backgroundColor:'#68a0cf',
        textAlign: 'center',
        margin: 20,
        height: 48,
        fontSize: 27,
        fontWeight: 'bold'
    },
    texto: {
        // backgroundColor: '#2196F3',
        textAlign: 'center',
        margin: 20,
        //  height: 48,
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
    }
})

export default FinalizarQuiz