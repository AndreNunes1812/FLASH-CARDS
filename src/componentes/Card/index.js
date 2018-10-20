import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { funcAddCard, funcGetCards } from '../../actions/cards'

import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    AsyncStorage
} from 'react-native'

class Card extends Component {

    

    constructor(props) {
        super(props)

        state = {
            card: ''
        }
        this._onPress = this._onPress.bind(this)
    }

    componentDidMount = async () => {
       // console.log('ler:', this.props.cards)
        // data = await AsyncStorage.getItem('@MySuperStore:cards')
        // if (data != null) {
        //     this.cards = JSON.parse(data);
        // }
        this.props.dispatch(funcGetCards())
    }

    _onPress = () => {

        //  this.props.funcAddCard(this.state.card)
        this.props.dispatch(funcAddCard(this.state.card))


        //        this.cards.push(this.state.card)

        //        console.log('newCard', this.cards)
        // try {
        //     await AsyncStorage.setItem('@MySuperStore:cards', JSON.stringify(this.cards));
        // } catch (error) {
        // }

        Alert.alert('Card salvo com sucesso!');

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
    funcAddCard: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    console.log('State:', state)
    return {
        cards: state.card,
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        funcAddCard: (cards) => funcAddCard(cards),
        funcGetCards: () => funcGetCards()
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
