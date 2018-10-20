import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { funcGetCards } from '../../actions/cards'

class ListagemCard extends Component {

    cards = new Array()

    constructor(props) {
        super(props)
    }

    state = {
        cards: [
            { id: '1', 'descricao': 'Descricao 1' },
            { id: '2', 'descricao': 'Descricao 2' },
            { id: '3', 'descricao': 'Descricao 3' },
            { id: '4', 'descricao': 'Descricao 4' },
            { id: '5', 'descricao': 'Descricao 5' },
            { id: '6', 'descricao': 'Descricao 6' },
            { id: '7', 'descricao': 'Descricao 7' },
            { id: '8', 'descricao': 'Descricao 8' },
            { id: '9', 'descricao': 'Descricao 9' },

        ]
    }

    componentDidMount() {
       console.log('didmount:', this.navegacao)
       this.props.dispatch(funcGetCards())
    }

    componentWillMount() {
        console.log('componentWillMount:', this.navegacao)
    }


    _keyExtractor = (item, index) => item.id;

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.cards}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state.cards}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <Text style={styles.texto}>{item.descricao}</Text>
                            <Text style={styles.texto}>{item.id}</Text>

                        </View>
                    }
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
    funcGetCards: PropTypes.func.isRequired,

}


const mapStateToProps = (state) => {
    console.log('State Listagem:', state)
    return {
        cards: state.card,
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        funcGetCards: () => funcGetCardss(),
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
