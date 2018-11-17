import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements';
import { funcSetCards } from '../../actions/cards'
import { 
    View, 
    StyleSheet, 
    Text, 
    Alert, 
    FlatList, 
    TouchableWithoutFeedback 
} from 'react-native'
import { 
    getCards, 
    remover,
    containsLocalNotification, 
    setLocalNotification 
} from '../Storage'


class ListagemCard extends Component {

    quantidade = 0
    newDecks = null;

    constructor(props) {
        super(props)
    }

    componentDidMount() {
       
        this._atualizarCards()
    }

    _remover(rmCard) {
        console.log('Remover:', rmCard)
        remover(rmCard).then(() => {
            this._atualizarCards()
        })
        Alert.alert('Card removido com sucesso!');
    }

    _atualizarCards() {
        console.log('_atualizarCards')
        getCards().then((data) => {

             console.log('!containsLocalNotification()', !containsLocalNotification())

            if (!containsLocalNotification()){
                setLocalNotification()
           }
            this.props.funcSetCards(data)
            console.log('data:', data)
        })
    }

    _editar(title) {
        console.log('EDICAO:', title)
        this.setState({})
    }

    _keyExtractor = (item) => {
        item
    };

    render() {

        if (this.props.cardsReducer[0] != undefined) {
            const key = Object.values(this.props.cardsReducer[0]);
            this.newDecks = key[0]
        }

        return (
            <View style={styles.container}>
                {this.newDecks != null ? (
                    <FlatList
                        data={Object.keys(this.newDecks).map((id) => this.newDecks[id])}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.montagem === 'sim' ?
                                        (
                                            this.props.navegacao.navigation.navigate('CardNumber',
                                                {
                                                    quantidade: item.questions,
                                                    titulo: item.title,
                                                    item: item,
                                                    questions: item.questions
                                                })
                                        ) : (null)
                                }}>

                                    <View>
                                        <Card>
                                            <Text style={styles.texto}>
                                                {item.title}
                                            </Text>
                                            <View style={styles.containerRow}>
                                                {this.props.montagem === 'sim' ? (

                                                    <Text style={styles.textoLength}>
                                                        {item.questions.length} cards
                                                    </Text>

                                                ) : (null)}

                                                {this.props.montagem === 'nao' ? (
                                                        <Button  
                                                            onPress={() => this._remover(item.title)}
                                                            title="Remover"
                                                            color="#2196F3"
                                                            backgroundColor="#ffffff"
                                                        />
                                                 
                                                    ) : (null)}
                                            </View>
                                        </Card>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                        )
                        }
                    />


                ) : (null)}

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    texto: {
        color: '#2196F3',
        fontSize: 20,
        paddingTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        textAlign: 'center',
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

//export default ListagemCard

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'listagemCard',
    enableReinitialize: true,
    //   validate,
    //   warn
})(ListagemCard));