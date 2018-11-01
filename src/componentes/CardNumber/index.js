import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm , Field } from 'redux-form'
import { bindActionCreators} from "redux"
import { connect } from 'react-redux'
import { setCard, remover, getCards, saveKey, getKey } from '../Storage'
import { funcSetCards } from '../../actions/cards'
import { Card, Button, ButtonGroup } from 'react-native-elements'

import { createStackNavigator } from 'react-navigation'
import PerguntaCard from '../PerguntaCard/index'

import {
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

class CardNumber extends PureComponent {

    cards = []

    constructor(props) {
        super(props)

        state = {
            index: 0,
            myNumber: 0
        }
        self = this

        this.updateIndex = this.updateIndex.bind(this)
        this.onChanged = this.onChanged.bind(this)
        this._chamadaNavegacao = this._chamadaNavegacao.bind(this)
    }

    updateIndex = (index) => {
        this.setState({ index })
        console.log('index:', index)
        this._chamadaNavegacao(index)

    }

    _chamadaNavegacao(id) {

        if (id === 1) {
            // this.props.navegacao.navigation.navigate('PerguntaCard', {
            //     quantidade: itemDetail.questions.length,
            //     titulo: itemDetail.title
            // })
        }


    }

    onChanged(text) {
        console.log('TEXTO:', text)
    }

    render() {

        const { navigation } = this.props;
        const quantidade = navigation.getParam('quantidade', 'NO-ID')
        const titulo = navigation.getParam('titulo', 'card não disponivel')

        console.log('Navigation: ' , this.props)

        return (
            <View >
                    <Card title={titulo}>
                        <View >
                            <Field 
                                placeholder="informe quantidade de pergunta(s)"
                                style={styles.input}
                                keyboardType='numeric'
                                onChangeText={(text) => this.onChanged(text)}
                                value={self.state.myNumber}                              
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
        height: 50
    }
})

CardNumber.propTypes = {
    funcSetCards: PropTypes.func.isRequired,

}

const CardNumberApp = createStackNavigator({
     PerguntaCard: { screen: PerguntaCard ,
        navigationOptions: ({ navigation }) => ({
            title: 'ADCIONAR PERGUNTA',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                backgroundColor: '#2196F3',
            }
        }) 
     },
})

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
    form: 'cardNumber',
    enableReinitialize: true,
    //   validate,
    //   warn
})(CardNumber));