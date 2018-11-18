import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, ButtonGroup } from 'react-native-elements'
import { funcSetCards } from '../../actions/cards'
import { getCards } from '../Storage'
import {
    View,
    StyleSheet,
    Alert,
    Text
} from 'react-native'

class CardNumber extends Component {

    cards = []
    titulo = ''
    quantidade = 0
    item = null
    questions = []

    constructor(props) {
        super(props)

        state = {
            index: 0,
            myNumber: 0
        }
        self = this
        this.onChanged = this.onChanged.bind(this)
    }
    
    componentDidMount() {
        this._atualizarCards()
    }

    _atualizarCards() {
        getCards().then((data) => {
            this.props.funcSetCards(data)
        })
    }

    updateIndex = (index) => {
        this.setState({ index })
        this._chamadaNavegacao(index)
    }

    onChanged(text) {
        this.quantidade = text
    }

    render() {

        const { navigation } = this.props;
        this.item = navigation.getParam('item','NO-ID')
        this.titulo = navigation.getParam('titulo', 'card não disponivel')
        this.questions = navigation.getParam('questions', 'card não disponivel') 
        this.quantidade = navigation.getParam('quantidade', 'quantidade não informada')
        
        return (
            <View >
                <Card title={this.titulo} >
                    <View >
                        <Text>Nº de baralhos {this.questions.length}</Text>
                        <ButtonGroup
                            selectedBackgroundColor="blue"
                            onPress={(index) => {

                                if (index === 1) {
                                    navigation.navigate('PerguntaCard', {
                                        quantidade: this.quantidade,
                                        titulo: this.titulo,
                                        item: this.item,
                                        questions: this.questions
                                    })
                                } else {
                                    if (this.quantidade === 0) {
                                        Alert.alert('Não a pergunta(s) para o Quiz!');
                                    } else {
                                        navigation.navigate('QuizCard', {
                                            quantidade: this.quantidade,
                                            titulo: this.titulo,
                                            item: this.item,
                                            questions: this.questions
                                        })

                                    }
                                }
                            }}
                            selectedIndex={self.state.index}
                            buttons={['Quiz', 'Perguntas']}
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
    }
})

CardNumber.propTypes = {
    funcSetCards: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    console.log('State Listagem:', state.cards)

    return {
        cardsReducer: state.cards,
        sendCards: this.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        funcSetCards: (sendCards) => funcSetCards(sendCards),
    }, dispatch))
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'cardNumber',
    enableReinitialize: true,
    //   validate,
    //   warn
})(CardNumber));