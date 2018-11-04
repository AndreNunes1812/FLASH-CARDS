import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback  } from 'react-native'
import { funcSetCards } from '../../actions/cards'
import { getCards, remover } from '../Storage'

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

        // remover('Ale')

        getCards().then((retorno) => {
            // console.log('retorno:', retorno)

            this.setState({ cards: retorno }, () => {
                // console.log('setState:', this.state.cards)
                this.props.funcSetCards(retorno)
            })
        });
    }

    _keyExtractor = (item) => {
        item
    };

    render() {
        // console.log('STATE :', this.state.cards)
        // console.log('cardsReducer :', this.props.cardsReducer)
        cardsNew= []
        if (this.props.cardsReducer[0] !== undefined) {
            const  { cards } = this.props.cardsReducer[0]
            // console.log('cardsNew :', cards)  
            cardsNew = cards
        }  
        
        return (

            <FlatList
                data={cardsNew}
                keyExtractor={(item) => Object.keys(item)[0] }
                renderItem={({ item }) => {
                    console.log('Item Listage:', item)  
                    console.log(' Object.keys(item)[0]:',  Object.keys(item)[0]) 
                    const key = Object.keys(item)[0];
                    let itemDetail = item[key];

                    /// 
                    const keySub = Object.values( item);
                    console.log('key:', keySub)
                    console.log('key 2:', keySub[0])
        
                    console.log('key title:', keySub[0].title)
                    console.log('key question:', keySub[0].questions.length)

                    //



                    // if (itemDetail.questions.length > 0) {                        
                    //     this.quantidade = itemDetail.questions[0].length
                    //     // console.log('> 0:', this.quantidade)
                    //     // console.log('itemDetail.questions:', itemDetail.questions)

                        
                    // } else {
                    //     this.quantidade = itemDetail.questions.length 
                    //     // console.log(' = 0', this.quantidade)
                    //     // console.log('itemDetail.questions 2:', itemDetail.questions)
                    // }

                    return (

                        <View>
                            <TouchableWithoutFeedback onPress={() =>  this.props.navegacao.navigation.navigate('CardNumber', {
                                quantidade: keySub[0].questions.length,
                                titulo: itemDetail.title ,
                                item: itemDetail,
                                questions: itemDetail.questions
                                })}>
                                <View>
                                    <Text style={styles.texto}>
                                        {itemDetail.title}
                                    </Text>
                                    <Text style={styles.textoLength}>
                                        ({keySub[0].questions.length})                                   
                                    </Text>               
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )
                }}
            />

        );
    }

    actionOnRow(item) {
        console.log('Selected Item :',item);
        
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
        fontSize: 15,
        paddingTop: 20,
        fontWeight: 'bold',
    },
    textoLength: {
        color: 'black',
        fontSize: 15,
        paddingTop: 20,
        paddingLeft: 15,
        fontWeight: 'bold',
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