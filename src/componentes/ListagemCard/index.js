import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { View, StyleSheet, Fragment,Text, Alert, ScrollView,FlatList, TouchableWithoutFeedback } from 'react-native'
import { getCards, remover } from '../Storage'
import { Card, Button } from 'react-native-elements';

class ListagemCard extends Component {

   // cards = []
    quantidade = 0

    constructor(props) {
        super(props)
    }

    state = {
        cartao: [],        
    }

    componentDidMount() {
        getCards().then((retorno) => {
            this.setState({ cartao: retorno }, () => {
                console.log('RETORNO:', retorno)
                
                console.log('RETORNO TAMANHO:', retorno.length)
                
              //  this.props.funcSetCards(retorno)
            })
        });

    }

    // componentDidUpdate(){
    //     console.log('componentDidUpdate')
    //     this._atualizarCards();
    // }

    async _remover(rmCard) {
        console.log('Remover:', rmCard)
        data = await remover(rmCard).then(() => {
             this._atualizarCards()
        })
        Alert.alert('Card removido com sucesso!');
    }

    _atualizarCards() {
        console.log('_atualizarCards')
        data = getCards().then((data) => {
            // this.props.funcSetCards(data)
            this.setState({cards: data})
        })
    }

    _editar = () => {

    }

    _keyExtractor = (item) => {
        item
    };

    render() {
        console.log('STATE :', this.state.cartao)
        //console.log('cardsReducer :', this.props.cardsReducer[0])
        //console.log('cardsReducer Length :', this.props.cardsReducer.length)



        cardsNew = []

          console.log('STATE Length:', this.state.cartao.length)
        if (this.state.cartao.length !== 0) {
            cardsNew = this.state.cartao
        }

        return (
            console.log('return', this.state.cartao),
            <View style={styles.container}>
            <ScrollView>
              
                    {this.state.cartao.map((c , index ) => (
                        console.log('C', c),
                        <View key = {c.name}>
                            <Text>
                                {c.title}
                            </Text>
                       
                        </View>
                    ))}
 
            </ScrollView>
            </View>
        );
    }

    actionOnRow(item) {
        console.log('Selected Item :', item);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    box2: {
        backgroundColor: 'blue',
        //  height: 480,
    },
    texto: {
        color: 'blue',
        fontSize: 20,
        paddingTop: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerRow: {
        //flex: 1,
        flexDirection: 'row',
    },
    textoLength: {
        color: 'black',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 20,
        paddingLeft: 15,
        fontWeight: 'bold',
        marginLeft: 120
    }
});

// ListagemCard.propTypes = {
//     funcSetCards: PropTypes.func.isRequired,
// }


// const mapStateToProps = (state) => {
//     console.log('State Listagem:', state.cards)

//     return {
//         cardsReducer: state.cards,
//         sendCards: this.cards
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return (bindActionCreators({
//         funcSetCards: (sendCards) => funcSetCards(sendCards),
//     }, dispatch))
// }

export default ListagemCard

// export default connect(
//     mapStateToProps, mapDispatchToProps
// )(reduxForm({
//     form: 'listagemCard',
//     enableReinitialize: true,
//     //   validate,
//     //   warn
// })(ListagemCard));