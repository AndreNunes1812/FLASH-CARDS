import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { getDeck } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import { Card, Button} from 'react-native-elements'

import {
    View,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native'

class QuizCard extends Component {

    cards = []
    item = null
    titulo = null
    questions = []
    quantidade = 1
    indexPergunta = 0
    pergunta = ''
    resposta = ''

    state = {
        index: 0,
        qtdSalva: 1,
        infPergunta: null,
        infResposta: null,
        disableSalvar: false,
        cardPergunta: true,
        cardResposta: false,
        numQuestao: 0,
        pergunta: '',
        resposta: ''
    }

    componentDidMount() {

        console.log('QUIZ', this.props.navigation)

        this._chamarPegunta()

    }
    _pergunta() {
        this.setState({ cardResposta: false, cardPergunta: true })
    }

    _resposta() {
        this.setState({ cardResposta: true, cardPergunta: false })
    }

    _capturarPerguntaResposta(capturar) {
        this.setState({ pergunta: capturar.question, resposta: capturar.answer })
    }

    _respostaQuiz(resposta) {
        this.indexPergunta = this.indexPergunta + 1
        if (this.quantidade === this.state.numQuestao) {
            this.props.navigation.push('FinalizarQuiz', {
                navegacao: this.state
            })
        } else {
            this._capturarPerguntaResposta(this.questions[this.indexPergunta])
            this.quantidade = this.quantidade + 1
        }
    }

    _chamarPegunta() {
        getDeck(this.titulo)
            .then((deck) => {
                if (deck.questions.length === 0) {
                    Alert.alert('Favor gerar as perguntas.')
                } else {
                    this.setState({ numQuestao: deck.questions.length }, () => {
                        this.questions = deck.questions
                        this._capturarPerguntaResposta(this.questions[this.indexPergunta])
                    })
                }
            })
    }

    render() {
        const { navigation, cards } = this.props;
        this.titulo = navigation.getParam('titulo', 'Baralho não disponivel')
        this.item = navigation.getParam('item', 'Objeto não encontrado')
        this.cards = cards

        return (
            <View>
                <View >

                    {this.state.cardPergunta && this.state.numQuestao > 0 ? (
                        <Card title={this.titulo}>
                            <View >
                                <Text style={styles.titleText} >
                                    Quiz: {this.quantidade} / {this.state.numQuestao} {'\n'}{'\n'}
                                </Text>

                                <View style={styles.containerRow} >

                                    <Text style={styles.pergunta} >
                                        {this.state.pergunta}  {'\n'}{'\n'}{'\n'}
                                    </Text>
                                    <Text style={styles.pergunta} >
                                        {'\n'}{'\n'}
                                    </Text>
                                </View>

                                <Button
                                    onPress={() => this._resposta()}
                                    title="resposta"
                                    color="#841584"
                                    backgroundColor="#ffffff"
                                />

                                <View style={styles.containerRow} >
                                    <TouchableOpacity disabled={this.state.isDisabled} style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={() => this._respostaQuiz('sim')}>
                                        <Text style={[styles.buttonText, { color: '#ffff' }]}>Salvar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={this.state.isDisabled} style={[styles.button, { backgroundColor: '#F15750' }]} onPress={() => this._respostaQuiz('nao')}>
                                        <Text style={[styles.buttonText, { color: '#fff' }]}> Não</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    ) : (this.state.cardPergunta ? <Text style={styles.titleText}> Não a QUIZ disponível</Text> : (null))}
                    {this.state.cardResposta && this.state.numQuestao > 0 ? (
                        <Card title={this.titulo}
                            backgroundColor="#1919e6">
                            <View >
                                <Text style={styles.titleText} >
                                    {this.state.resposta}   {'\n'}{'\n'}
                                </Text>
                                <Button
                                    onPress={() => this._pergunta()}
                                    title="pergunta"
                                    color="#841584"
                                    backgroundColor="#ffffff"
                                />
                                <View style={styles.containerRow} >
                                    <TouchableOpacity disabled={this.state.isDisabled} style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={() => this._respostaQuiz('sim')}>
                                        <Text style={[styles.buttonText, { color: '#ffff' }]}>Salvar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={this.state.isDisabled} style={[styles.button, { backgroundColor: '#F15750' }]} onPress={() => this._respostaQuiz('nao')}>
                                        <Text style={[styles.buttonText, { color: '#fff' }]}> Não</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    ) : (null)}
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
    containerRow: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    perguntaText: {
        width: 150,
        fontSize: 30,
        fontWeight: 'bold',
    },

    texto: {
        backgroundColor: '#2196F3',
        width: 150,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pergunta: {
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 20,
        alignItems: 'center',
        fontWeight: 'bold',
    },
})

QuizCard.propTypes = {
    funcSetCards: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
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
    //   validate,
    //   warn
})(QuizCard));