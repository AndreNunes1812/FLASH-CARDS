import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { setCard, remover, getCards, saveKey, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import { Card, Button, ButtonGroup } from 'react-native-elements'

import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    Label

} from 'react-native'

class PerguntaCard extends Component {

    cards = []

    state = {
        index: 0
    }

    updateIndex = (index) => {
        this.setState({ index })
    }

    onChanged(text) {
        console.log('TEXTO:', text)
    }

    render() {

        const { navigation } = this.props;
        const quantidade = navigation.getParam('quantidade', 'NO-ID')
        const titulo = navigation.getParam('titulo', 'card não disponivel')

        return (
            <View >
                <Card title={titulo}>
                    <View >
                        <TextInput
                            placeholder="informe quantidade de pergunta(s)"
                            style={styles.input}
                           
                           // onChangeText={(text) => this.onChanged(text)}
                            // value={this.state.myNumber}
                            maxLength={10}  
                        />
                        <ButtonGroup
                            selectedBackgroundColor="blue"
                            onPress={this.updateIndex}
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
        backgroundColor: '#2196F3',
    },
    input: {
        height:50
    }
})

PerguntaCard.propTypes = {
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
    form: 'perguntaCard',
    enableReinitialize: true,
    //   validate,
    //   warn
})(PerguntaCard));