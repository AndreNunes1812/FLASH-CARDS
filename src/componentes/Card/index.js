import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { saveDeckTitle, remover, getCards } from '../Storage'
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
              
        if(this.state.card === null) {
            Alert.alert('Informar o nome do Baralho.')
        } else {
            let card = this.state.card
            saveDeckTitle(card)
            .then(()=>{
                this._atualizarCards()
                Alert.alert('Baralho salvo com sucesso!');
            })
        }
    }

    _atualizarCards() {
        getCards().then((data) => {
            this.props.funcSetCards(data)
        })
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
                    onChangeText={(e) => {
                        this.setState({ card: e })
                    }}
                />
                <View style={styles.containerRow}  >
                    <TouchableOpacity onPress={this._onPress}>
                        <View style={styles.button}>
                            <Text>Criar</Text>
                        </View>
                    </TouchableOpacity>
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
        funcSetCards: (cards) => funcSetCards(cards)
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
