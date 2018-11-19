import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { saveDeckTitle, remover, getBaralhos } from '../Storage'
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

class Baralho extends Component {

    baralhos = []

    state = {
        baralho: '',
        isDisabled: true
    }

    constructor(props) {
        super(props)

        this._onPress = this._onPress.bind(this)
        this._atualizarBaralhos = this._atualizarBaralhos.bind(this)
        this._removerBaralho = this._removerBaralho.bind(this)
        this._onChange = this._onChange.bind(this)
    }

    _onPress() {  
              
        if(this.state.baralho.length === 0) {
            Alert.alert('Informar o nome do Baralho.')
        } else {
            let baralho = this.state.baralho
            saveDeckTitle(baralho)
            .then(()=>{
                this._atualizarBaralhos()
            })
        }
    }

    _onChange(ref) {      
        this.setState({ baralho: ref , isDisabled: false})     
    }

    _atualizarBaralhos() {
        getBaralhos().then((data) => {
            this.props.funcSetCards(data)          
            this.props.navigation.push('BaralhoIndividual',
            {
                quantidade: 0,
                titulo: this.state.baralho,
                item: 0,
                questions: 0
            })
            this.setState({baralho: ''})
        })
    }

    _onPressRemover = () => {        
        this._removerCard(this.state.baralho)        
    }

    async _removerBaralho(rmCard) {
        data = await remover(rmCard).then(() => {
            this._atualizarBaralhos()
        })          
        Alert.alert('Baralho removido com sucesso!');
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Inserir Baralho"
                    name="card"
                    underlineColorAndroid="transparent"
                    onChangeText={(e) => { this._onChange(e) }}
                    value={this.state.baralho}
                />
                <View  >
                    <TouchableOpacity
                         disabled={this.state.isDisabled} 
                         style={[styles.button, { backgroundColor: '#2196F3' }]} 
                         onPress={() =>  this._onPress() }
                        >
                       <Text style={[styles.buttonText, { color: '#fff' }]}>Criar Baralho</Text>
                    </TouchableOpacity>
                </View>

                < ListagemCard navegacao={this.props.baralhos} montagem={'nao'} />
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
    button: {
        padding: 20,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
})

Baralho.propTypes = {
    funcSetCards: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    return {
        baralhos: state.cards,
        cardsUpdate: this.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        funcSetCards: (baralhos) => funcSetCards(baralhos)
    }, dispatch))
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'baralho',
    enableReinitialize: true,
})(Baralho))