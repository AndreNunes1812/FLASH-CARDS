import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { addCardToDeck, getCards, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import { Card } from 'react-native-elements'

import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native'

class PerguntaCard extends Component {

    cards = []
    item = null
    titulo = null
    questions = []
    quantidade = 0

    state = {
        index: 0,
        qtdSalva: 1,
        infPergunta: null,
        infResposta: null,
        disableSalvar: false,
        isDisabled: true
    }

    componentDidMount() {
        this._chamarPegunta()
    }

    _chamarPegunta() {
        getKey(this.titulo).then((value) => {
            if (JSON.parse(value) !== null) {
                const key = Object.values(JSON.parse(value));
            }
        })
    }

    _salvarPergunta(pergunta, resposta) {
        addCardToDeck(this.titulo, {
            question: pergunta,
            answer: resposta,
        }).then(() => {
            this._atualizarCards()
            Alert.alert('Card salvo com sucesso!');
        })
    }

    _atualizarCards() {
        getCards().then((data) => {
            this.props.funcSetCards(data)
        })
    }

    _onChange(ref) {
        if (ref) {
            this.setState({isDisabled: false})
        } else {
            this.setState({isDisabled: true})
        }
    }

    _updateIndex() {
        this.setState({ qtdSalva: this.state.qtdSalva + 1, infPergunta: null, infResposta: null })
        this.infPergunta.clear()
        this.infResposta.clear()
        this._salvarPergunta(this.infPergunta._lastNativeText, this.infResposta._lastNativeText)
        this.setState({isDisabled: true})
    }

    render() {

        const { navigation, cards } = this.props;
        this.quantidade = navigation.getParam('quantidade', 'NO-ID')
        this.titulo = navigation.getParam('titulo', 'card não disponivel')
        this.item = navigation.getParam('item', 'Objeto não encontrado')
        this.questions = navigation.getParam('questions', 'Objeto não encontrado')
        this.cards = cards

        return (
            <View >

                <Card title={this.titulo}>
                    <View >
                        <Text style={styles.titleText} >
                            Nº pergunta {this.state.qtdSalva} {'\n'}{'\n'}
                        </Text>
                        <TextInput
                            placeholder="Informe sua pergunta"
                            style={styles.input}
                            onChangeText={(ref) => this._onChange(ref)}
                            underlineColorAndroid="transparent"
                            ref={ref => {
                                this.infPergunta = ref;
                            }}
                        />
                        <TextInput
                            placeholder="Informe sua resposta"
                            style={styles.input}
                            onChangeText={(ref) => this._onChange(ref)}
                            underlineColorAndroid="transparent"
                            ref={ref => {
                                this.infResposta = ref;
                            }}
                        />
                        <View style={styles.resultBottom}>
                            <TouchableOpacity disabled={this.state.isDisabled} style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={() => this._updateIndex()}>
                                <Text style={[styles.buttonText, { color: '#ffff' }]}>Salvar</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity disabled={this.state.isDisabled} style={[styles.button, { backgroundColor: '#F15750' }]} onPress={() =>  this.updateIndex('nao') }>
                                <Text style={[styles.buttonText, { color: '#fff' }]}> Não</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </Card>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        padding: 30,
    },
    texto: {
        backgroundColor: '#2196F3',
    },
    input: {
        height: 50
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
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
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    resultBottom: {
        marginTop: 30,
    }
})

PerguntaCard.propTypes = {
    funcSetCards: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    console.log('State PerguntaCard:', state)
    return {
        cards: state.cards,
        cardsUpdate: this.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        funcSetCards: (cardsUpdate) => funcSetCards(cardsUpdate)
    }, dispatch))
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'perguntaCard',
    enableReinitialize: true,
})(PerguntaCard))