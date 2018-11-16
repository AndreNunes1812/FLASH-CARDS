import React, { Component } from 'react'
import { Card, ButtonGroup } from 'react-native-elements'
import {
    View,
    StyleSheet,
    Alert
} from 'react-native'

class CardNumber extends Component {

    cards = []
    titulo = ''
    quantidade = 0
    item = null
    questions = []

    constructor(props) {
        super(props)

        state = {
            index: 0,
            myNumber: 0
        }
        self = this
        this.onChanged = this.onChanged.bind(this)
    }

    updateIndex = (index) => {
        this.setState({ index })
        this._chamadaNavegacao(index)
    }

    onChanged(text) {
        this.quantidade = text
    }

    render() {

        const { navigation } = this.props;
        this.item = navigation.getParam('item','NO-ID')
        this.titulo = navigation.getParam('titulo', 'card não disponivel')
        this.questions = navigation.getParam('questions', 'card não disponivel') 
        this.quantidade = navigation.getParam('quantidade', 'quantidade não informada')

        console.log('item: ', this.item)

        console.log('Navigation ', navigation)
        
        return (
            <View >
                <Card title={this.titulo}>
                    <View >

                        <ButtonGroup
                            selectedBackgroundColor="blue"
                            onPress={(index) => {

                                if (index === 1) {
                                    navigation.navigate('PerguntaCard', {
                                        quantidade: this.quantidade,
                                        titulo: this.titulo,
                                        item: this.item,
                                        questions: this.questions
                                    })
                                } else {
                                    if (this.quantidade === 0) {
                                        Alert.alert('Não a pergunta(s) para o Quiz!');
                                    } else {
                                        navigation.navigate('QuizCard', {
                                            quantidade: this.quantidade,
                                            titulo: this.titulo,
                                            item: this.item,
                                            questions: this.questions
                                        })

                                    }
                                }
                            }}
                            selectedIndex={self.state.index}
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

// CardNumber.propTypes = {
//     funcSetCards: PropTypes.func.isRequired,

// }

// const CardNumberApp = createStackNavigator({
//     CardNumber: { screen: CardNumber },
//     PerguntaCard: { screen: PerguntaCard ,
//         navigationOptions: ({ navigation }) => ({
//             title: 'ADCIONAR PERGUNTA',
//             headerTitleStyle: { color: 'white' },
//             headerStyle: {
//                 backgroundColor: '#2196F3',
//             }
//         }) 
//      },
// })

export default CardNumber