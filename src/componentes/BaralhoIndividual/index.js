import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, ButtonGroup } from 'react-native-elements'
import { funcSetCards } from '../../actions/cards'
import { getBaralhos } from '../Storage'
import {
    View,
    StyleSheet,
    Alert,
    Text
} from 'react-native'

class BaralhoIndividual extends Component {

    cards = []
    titulo = ''
    quantidade = 0
    item = null
    questions = []

    constructor(props) {
        super(props)
        this.onChanged = this.onChanged.bind(this)
    }

    state = {
        index: 0,
        myNumber: 0
    }
    
    componentDidMount() {
        this._atualizarCards()
    }

    _atualizarCards() {
        getBaralhos().then((data) => {
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
        this.titulo = navigation.getParam('titulo', 'baralho não disponivel')
        this.questions = navigation.getParam('questions', 'baralho não disponivel') 
        this.quantidade = navigation.getParam('quantidade', 'quantidade não informada')
        
        if (this.props.cards[0] !== undefined) {
            let tituloNew = this.titulo
            const key = Object.values(this.props.cards[0]);
            this.newDecks = key[0]
            Object.keys(this.newDecks).
            map((id) => {            
               if (this.newDecks[id].title === tituloNew) {
                  this.questions = this.newDecks[id].questions.length
               } 
            })            
        }

        return (
            <View >
                <Card title={this.titulo} >
                    <View >
                        <Text  style={styles.texto}>Número de Cards: {this.questions}</Text>
                        <ButtonGroup
                            selectedBackgroundColor="blue"
                            onPress={(index) => {

                                if (index === 1) {
                                    navigation.navigate('Pergunta', {
                                        quantidade: this.quantidade,
                                        titulo: this.titulo,
                                        item: this.item,
                                        questions: this.questions
                                    })
                                } else {
                                    if (this.questions === 0) {
                                        Alert.alert('Não a pergunta(s) para o Quiz!');
                                    } else {
                                        navigation.navigate('Quiz', {
                                            quantidade: this.quantidade,
                                            titulo: this.titulo,
                                            item: this.item,
                                            questions: this.questions
                                        })

                                    }
                                }
                            }}
                            selectedIndex={this.state.index}
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
        justifyContent: 'center',
    },
    input: {
        height: 50
    }
})

BaralhoIndividual.propTypes = {
    funcSetCards: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
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
})(BaralhoIndividual))