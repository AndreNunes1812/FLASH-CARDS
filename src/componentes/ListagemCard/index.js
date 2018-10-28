import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { View, StyleSheet, Text, FlatList, List, ListItem } from 'react-native'
import { funcSetCards } from '../../actions/cards'
import { getKey, getCards } from '../Storage'

class ListagemCard extends  PureComponent {

    cards = []
    counter= 0

    constructor(props) {
        super(props)
    }

    state = {
        cards: []
    }

    componentDidMount() {

        getCards().then((retorno) => {
            console.log('retorno:', retorno)

       
            this.setState({ cards: retorno }, () => {
                 console.log('setState:', this.state.cards)
                this.props.funcSetCards(retorno)
            })
        });

    }

    componentWillMount() {
        // console.log('componentWillMount:', this.navegacao)
    }


    _keyExtractor = (item , index) => {
        item
        //Object.keys(item)[0]
    }; 

    render() {
        console.log('STATE :', this.state.cards)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.cards}
                    showsVerticalScrollIndicator={false}
                   // extraData={this.state.cards}
                    keyExtractor={ (item) => Object.keys(item)[0] }
                    renderItem={( item ) => {                        
                        const key = Object.keys(item)[0];
                        const itemDetail = item[key];
                       
                        <View style={styles.container}>
                            {console.log('itemDetail:',itemDetail.title)}
                            <Text style={styles.texto}>{itemDetail.title}</Text>
                            {/* <Text style={styles.texto}>{item.id}</Text> */}

                        </View>
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    box2: {
        backgroundColor: 'white',
        //  height: 480,
    },
    texto: {
        //justifyContent: 'center',
        color: 'green',
        fontSize: 15,
        paddingTop: 20,
        fontWeight: 'bold',

    }
});

ListagemCard.propTypes = {
    funcSetCards: PropTypes.func.isRequired,

}


const mapStateToProps = (state) => {
    console.log('State Listagem:', state.cards)
    return {
        cardsReducer: state.card,
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
