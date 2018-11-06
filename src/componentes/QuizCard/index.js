import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { setCard, remover, getCards, saveKey, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import { Card, Button, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Alert,
    Label

} from 'react-native'

class QuizCard extends Component {

    cards = []
    item = null
    titulo = null
    questions = []
    quantidade = 1
    pergunta= ''
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
        console.log('Fui chamado:')
        this.questions = this.props.navigation.getParam('questions', 'Objeto não encontrado')
        console.log('Item questions:', this.questions)
        console.log('Item question:', this.questions[0])       

        this._chamarPegunta()

    }
    _pergunta() {
        this.setState({ cardResposta: false, cardPergunta: true })
    }

    _resposta() {
        this.setState({ cardResposta: true, cardPergunta: false })
    }

    _capturarPerguntaResposta(capturar) {

        console.log('capturar question:', capturar.question, capturar.answer)
        //this.pergunta = capturar.question
        //this.resposta = capturar.answer
        this.setState({pergunta: capturar.question, resposta: capturar.answer })  
    }

    _respostaQuiz( resposta) {
        console.log('resposta:', resposta)


        if (this.quantidade === this.state.numQuestao ) {
            console.log('FINALIZOU')
        } else {
            console.log('this.questions:', this.questions[this.quantidade])
            this._capturarPerguntaResposta(this.questions[this.quantidade])
        }
        
        this.quantidade= this.quantidade + 1
    }

    _chamarPegunta() {
        getKey(this.titulo).then((value) => {
            console.log('Data:', value)

            console.log('Data JSON:', JSON.parse(value))

            const key = Object.values(JSON.parse(value));
            console.log('key:', key)
            console.log('key 2:', key[0])

            console.log('key title:', key[0].title)
            console.log('key question:', key[0].questions.length)
            this.setState({ numQuestao: key[0].questions.length })
            this._capturarPerguntaResposta(this.questions[0])

        })

    }

     render() {

        const { navigation, cards } = this.props;
        // this.quantidade = navigation.getParam('quantidade', 'NO-ID')
        this.titulo = navigation.getParam('titulo', 'card não disponivel')
        this.item = navigation.getParam('item', 'Objeto não encontrado')
        this.cards = cards

        console.log('Item:', this.item)
        console.log('State:', this.state)
        
      
        return (
            <View>
                <View >

                    {this.state.cardPergunta ? (
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
                                    <Button
                                        style={styles.texto}
                                        onPress={() => this._respostaQuiz('sim')}
                                        title="Sim"
                                        color="#841584"
                                    ///backgroundColor="blue"
                                    />
                                    <Button
                                        style={styles.texto}
                                        onPress={() => this._respostaQuiz('nao')}
                                        title="Não"
                                        color="#841584"
                                    ///backgroundColor="yellow"
                                    />
                                </View>

                            </View>
                        </Card>
                    ) : (null)}
                    {this.state.cardResposta ? (
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

                                <ButtonGroup
                                    disableSelected={this.state.disableSalvarResp}
                                    selectedBackgroundColor="#1919e6"
                                    onPress={this.updateIndex}
                                    selectedIndex={this.state.index}
                                    buttons={['Sim', 'Não']}
                                    containerStyle={{ height: 30 }} />
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
    },
    button: {
        padding: 30,
    },
    perguntaText:{
        width: 150,
        // alignItems: 'center',
        fontSize:30,

        fontWeight: 'bold',

    },

    texto: {
        backgroundColor: '#2196F3',
        width: 150,
        // alignItems: 'center',
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
    console.log('State Quiz:', state)
    return {
        cards: state.cards,
        cardsUpdate: this.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        // funcAddCard: (cards) => funcAddCard(cards),
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