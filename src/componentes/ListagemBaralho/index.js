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
    TouchableWithoutFeedback, 
    ActivityIndicator
} from 'react-native'
import { 
    getBaralhos, 
    remover,
    containsLocalNotification, 
    setLocalNotification 
} from '../Storage'


class ListagemBaralho extends Component {

    quantidade = 0
    newBaralho = null;

    constructor(props) {
        super(props)
    }

    state = {
        loading: true
    }

    componentDidMount() {  
           
        this._atualizarCards()
    }

    _atualizarCards() {
        getBaralhos().then((data) => {
           if (!containsLocalNotification()){
                setLocalNotification()
           }
            this.props.funcSetCards(data)
            if (data) {
                this.setState({loading: false})
            }
        })
    }

    _editar(title) {
        this.setState({})
    }

    _keyExtractor = (item) => {
        item
    };

    render() {

        if (this.props.cardsReducer[0] != undefined) {
            const key = Object.values(this.props.cardsReducer[0]);
            this.newBaralho = key[0]
        }

        return (
            <View style={styles.container}>
                <View style={styles.indicador}>
                    {this.state.loading ? <ActivityIndicator size="large" color="#2196F3" /> : (null)}
                </View>

                {this.newBaralho != null ? (
                    <FlatList
                        data={Object.keys(this.newBaralho).map((id) => this.newBaralho[id])}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.montagem === 'sim' ?
                                        (
                                            this.props.navegacao.navigation.navigate('BaralhoIndividual',
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
                                                        {item.questions.length} baralhos
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
    },
    indicador: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

ListagemBaralho.propTypes = {
    funcSetCards: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
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
})(ListagemBaralho));