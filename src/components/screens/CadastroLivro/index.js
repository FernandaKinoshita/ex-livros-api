import React, {
    useState
} from 'react'

import {
    Alert,
    ScrollView,
    Text       
} from 'react-native'

import {
    Button,
    Input
} from 'react-native-elements'

import { postLivro } from '../services/LivroService'

const CadastroLivro = ( props ) => {

    const { token } = props.route.params

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [paginas, setPaginas] = useState('')

    const validar = () => {
        if ( titulo.trim().length === 0 ) {
            Alert.alert('Erro', 'Título não informado!')
            return false 
        }

        if ( descricao.trim().length === 0 ) {
            Alert.alert('Erro', 'Descrição não informada!')
            return false 
        }

        if ( autor.trim().length === 0 ) {
            Alert.alert('Erro', 'Autor não informado!')
            return false 
        }

        if ( editora.trim().length === 0 ) {
            Alert.alert('Erro', 'Editora não informada!')
            return false 
        }

        const reNumber = /^[0-9]+$/
        if ( !reNumber.test(paginas) ) {
            Alert.alert('Erro', 'Páginas não informadas corretamente!')
            return false 
        }
         return true
    }

    const salvar = () => {
        if (validar() ){
            postLivro(token, titulo, descricao, autor, editora, paginas)
                .then(() => {
                    Alert.alert('Sucesso', 'Livro cadatrado!')
                    props.navigation.goBack()
                })
                .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o livro'))
        }
    }

    return (

        <ScrollView style={{ padding : 16 }}>
        <Text>Título:</Text>
        <Input
            onChangeText={(txt) => setTitulo(txt)}
            value= { titulo }/>

        <Text>Descrição:</Text>
        <Input
            onChangeText={(txt) => setDescricao(txt)}
            value= { descricao }/>

        <Text>Autor:</Text>
        <Input
            onChangeText={(txt) => setAutor(txt)}
            value= { autor }/>
        
        <Text>Editora:</Text>
        <Input
            onChangeText={(txt) => setEditora(txt)}
            value= { editora }/>

        <Text>Páginas</Text>
        <Input
            onChangeText={(txt) => setPaginas(txt)}
            value= { paginas }/>

        <Button 
        icon={{
            color : '#FFF',
            name : 'save',
            type : 'font=awesome-5'
        }}
        onPress={() => salvar()}
        title='Salvar'/>
        </ScrollView>
    )
}

export default CadastroLivro