import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { setCard, remover,getCards, saveKey, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'

import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert

} from 'react-native'

class Card extends Component {

    cards= []
    
    constructor(props) {
        super(props)

        state = {
            card: ''
        }
        this._onPress = this._onPress.bind(this)
        this._atualizarCards = this._atualizarCards.bind(this)
    }

    componentDidMount = async () => {
        // console.log('ler:', this.props.cards)
        // data = await AsyncStorage.getItem('@MySuperStore:cards')
        // if (data != null) {
        //     this.cards = JSON.parse(data);
        // }
        //  this.props.dispatch(funcSetCards())
    }

    _onPress = () => {
        // this.props.dispatch(funcAddCard(this.state.card, Math.random))

        let card = this.state.card
        saveKey( {[card]: {title: card, 'questions':[] } } , card).then(() =>{
            console.log('Apos salvar valores')
            this._atualizarCards()
        })
        //setCard( {[card]: {title: card, 'questions':[] } } )

        Alert.alert('Card salvo com sucesso!');
    }

    _atualizarCards() {
        getCards().then((retorno)=> {
            console.log('retorno dentro do CARD:', retorno)
            this.cards= retorno
            this.props.funcSetCards(retorno)       
        });       
    }

    _onPressLer = () => {
        let card = this.state.card
        getKey(card)



        Alert.alert('Card _onPressLer!');
    }


    _onPressRemover = () => {
        // this.props.dispatch(funcAddCard(this.state.card, Math.random))
        let card = this.state.card
        data = remover(card)
        .then(() => {
             console.log('remover:', JSON.stringify(data))
        })
        Alert.alert('Card removido com sucesso!');
    }


    render() {

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Inserir CARD"
                    name="card"
                    // value={this.state.card}
                    onChangeText={(e) => {
                        this.setState({ card: e })
                    }}
                />
                <TouchableOpacity onPress={this._onPress}>
                    <View style={styles.button}>
                        <Text>Salvar</Text>
                    </View>
                </TouchableOpacity>

                
                <TouchableOpacity onPress={this._onPressLer}>
                    <View style={styles.button}>
                        <Text>Ler</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._onPressRemover}>
                    <View style={styles.button}>
                        <Text>Remover</Text>
                    </View>
                </TouchableOpacity>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 15,
    },
    button: {
        padding: 30,
    },
    texto: {
        backgroundColor: '#2196F3',
    },
    input: {
        height: 40,
    }
})

Card.propTypes = {
    funcSetCards: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    console.log('State:', state)
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
    form: 'card',
    enableReinitialize: true,
    //   validate,
    //   warn
})(Card));
