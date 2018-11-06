import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Alert, FlatList, TouchableWithoutFeedback } from 'react-native'
import { funcSetCards } from '../../actions/cards'
import { getCards, remover } from '../Storage'
import { Card, Button } from 'react-native-elements';

class ListagemCard extends PureComponent {

    cards = []
    quantidade = 0

    constructor(props) {
        super(props)
    }

    state = {
        cards: []
    }

    componentDidMount() {
        getCards().then((retorno) => {
            this.setState({ cards: retorno }, () => {
                console.log('RETORNO:', retorno)
                this.props.funcSetCards(retorno)
            })
        });
    }

    async _remover(rmCard) {
        console.log('Remover:', rmCard)
        data = await remover(rmCard).then(() => {
            this._atualizarCards()
        })          
        Alert.alert('Card removido com sucesso!');
    }

    async _atualizarCards() {
        console.log('_atualizarCards')
        data = await  getCards().then((data) =>{
            this.props.funcSetCards(data)
        })
    }

    _editar = () => {

    }

    _keyExtractor = (item) => {
        item
    };

    render() {
        // console.log('STATE :', this.state.cards)
        console.log('cardsReducer :', this.props.cardsReducer[0])

        console.log('cardsReducer Length :', this.props.cardsReducer.length)



        cardsNew = []
         //if (this.props.cardsReducer[0] !== undefined) {
           if (  this.props.cardsReducer.length !== 0 ) {
            const { cards } = this.props.cardsReducer[0]
            console.log('cardsNew :', cards)  
            cardsNew = cards
        }

        return (

            <FlatList
                data={cardsNew}
                keyExtractor={(item) => Object.keys(item)[0]  }
                renderItem={({ item }) => {
                    console.log('Item Listage:')
                    console.log('Item Listage:', item)
                    console.log(' Object.keys(item)[0]:', Object.keys(item)[0])
                    const key = Object.keys(item)[0];
                    let itemDetail = item[key];

                    /// 
                    const keySub = Object.values(item);
                    console.log('key:', keySub)
                    console.log('key 2:', keySub[0])

                    console.log('key title:', keySub[0].title)
                    console.log('key question:', keySub[0].questions.length)

                    return (

                        <View>
                            <TouchableWithoutFeedback onPress={() => {
                                this.props.montagem === 'sim' ?
                                    (
                                        this.props.navegacao.navigation.navigate('CardNumber',
                                            {
                                                quantidade: keySub[0].questions.length,
                                                titulo: itemDetail.title,
                                                item: itemDetail,
                                                questions: itemDetail.questions
                                            })
                                    ) : (null)
                            }}>

                                <View>
                                    <Card>
                                        <Text style={styles.texto}>
                                            {itemDetail.title}
                                        </Text>
                                        <View style={styles.containerRow}>
                                            {this.props.montagem === 'nao' ? (
                                                <Button
                                                    onPress={() => this._editar}
                                                    title="Editar"
                                                    color="#2196F3"                                                    

                                                    backgroundColor="#ffffff"
                                                />) : (null)}
                                            {this.props.montagem === 'sim' ? (

                                                <Text style={styles.textoLength}>
                                                    ({keySub[0].questions.length})
                                                </Text>

                                            ) : ( null )}

                                            {this.props.montagem === 'nao' ? (
                                                <Button
                                                    onPress={() => this._remover(itemDetail.title)}
                                                    title="Remover"
                                                    color="#2196F3"
                                                    backgroundColor="#ffffff"
                                                />) : (null)}
                                        </View>
                                    </Card>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )
                }}
            />
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
        color: '#2196F3',
        fontSize: 20,
        paddingTop: 20,
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

ListagemCard.propTypes = {
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
    form: 'listagemCard',
    enableReinitialize: true,
    //   validate,
    //   warn
})(ListagemCard));