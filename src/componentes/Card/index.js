import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { setCard, remover, getCards, saveKey, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import ListagemCard from '../ListagemCard/index'

import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert

} from 'react-native'

class Card extends Component {

    cards = []

    constructor(props) {
        super(props)

        state = {
            card: ''
        }
        this._onPress = this._onPress.bind(this)
        this._atualizarCards = this._atualizarCards.bind(this)
        this._removerCard = this._removerCard.bind(this)
    }

    _onPress = () => {
        let card = this.state.card
        saveKey({ [card]: { title: card, 'questions': [] } }, card)
        console.log('Apos salvar valores')
        this._atualizarCards()
        Alert.alert('Card salvo com sucesso!,');
    }

    async _atualizarCards() {
        console.log('_atualizarCards')
        data = await  getCards().then((data) =>{
            this.props.funcSetCards(data)
        })
    }

    _onPressLer = () => {
        let card = this.state.card
        getKey(card)
        Alert.alert('Card _onPressLer!');
    }

    _onPressRemover = () => {        
        this._removerCard(this.state.card)        
    }

    async _removerCard(rmCard) {
        data = await remover(rmCard).then(() => {
            this._atualizarCards()
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
                <View style={styles.containerRow}  >
                    <TouchableOpacity onPress={this._onPress}>
                        <View style={styles.button}>
                            <Text>Salvar</Text>
                        </View>
                    </TouchableOpacity>


                    {/* <TouchableOpacity onPress={this._onPressLer}>
                        <View style={styles.button}>
                            <Text>Ler</Text>
                        </View>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity onPress={this._onPressRemover}>
                        <View style={styles.button}>
                            <Text>Remover</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
                < ListagemCard navegacao={this.props.cards} montagem={'nao'} />
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
    },
    containerRow: {
        //flex: 1,
        flexDirection: 'row',
    },
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
