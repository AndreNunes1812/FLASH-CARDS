import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { setCard, remover, getCards, saveKey, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import { Card, ButtonGroup } from 'react-native-elements'


import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Alert,
    Label

} from 'react-native'

class PerguntaCard extends Component {

    cards = []
    item = null
    titulo= null
    questions = []
    quantidade = 0

    state = {
        index: 0,
        qtdSalva: 1,
        infPergunta: null,
        infResposta: null,
        disableSalvar: false
    }

    componentDidMount() {
        console.log('Fui chamado:')
        this._chamarPegunta()      

    }

    _chamarPegunta() {
        getKey(this.titulo).then((value)=>{
            console.log('Data:', value)

            console.log('Data JSON:', JSON.parse( value))
            
            const key = Object.values(JSON.parse( value));
            console.log('key:', key)
            console.log('key 2:', key[0])

            console.log('key title:', key[0].title)
            console.log('key question:', key[0].questions)

        })

    }

    _salvarPergunta(pergunta , resposta) {
        console.log('this.titulo:', this.titulo)
        
        this.questions.push({ 'question': pergunta, 'answer': resposta })
             
        let card = this.titulo
        saveKey({ [card]: { title: card, 'questions':  this.questions } }, card)
        console.log('Apos salvar valores',this.state.qtdSalva, this.questions.length)
        this._atualizarCards()
        Alert.alert('Card salvo com sucesso!');
        
    }

    async _atualizarCards() {
        console.log('_atualizarCards')
        data = await  getCards().then((data) =>{
            this.props.funcSetCards(data)
        }).then(()=>{
            this._chamarPegunta()
        })
    }

    updateIndex = () => {
        this.setState({ qtdSalva: this.state.qtdSalva + 1, infPergunta: null, infResposta: null })
        console.log('Pergunta:', this.infPergunta._lastNativeText)
        console.log('Resposta:', this.infResposta._lastNativeText)
        
        this.infPergunta.clear()
        this.infResposta.clear()
        this._salvarPergunta(this.infPergunta._lastNativeText, this.infResposta._lastNativeText)
    }

    render() {

        const { navigation , cards } = this.props;
        this.quantidade = navigation.getParam('quantidade', 'NO-ID')
        this.titulo = navigation.getParam('titulo', 'card não disponivel')
        this.item = navigation.getParam('item', 'Objeto não encontrado')
        this.questions = navigation.getParam('questions', 'Objeto não encontrado')
        this.cards = cards

        console.log('Item:', this.item) 
        console.log('Item questions:', this.questions)    
        console.log('PerguntaCards redux:', this.cards) 

        return (
            <View >

                <Card title={this.titulo}>
                    <View >
                        <Text style={styles.titleText} >
                           Nº pergunta {this.state.qtdSalva} {'\n'}{'\n'}
                        </Text>
                        <TextInput
                            placeholder="Informe sua pergunta?"
                            style={styles.input}
                            ref={ref => {
                                this.infPergunta = ref;
                              }}

                        />
                        <TextInput
                            placeholder="Informe sua Resposta?"
                            style={styles.input}
                            ref={ref => {
                                this.infResposta = ref;
                              }}

                        />
                        <ButtonGroup
                            disableSelected= {this.state.disableSalvar}
                            selectedBackgroundColor="blue"
                            onPress={this.updateIndex}
                            selectedIndex={this.state.index}
                            buttons={['Salvar']}
                            containerStyle={{ height: 30 }} />
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
})(PerguntaCard));