import React, {
    useEffect
} from "react";

import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import {
    Button
} from 'react-native-elements'

import { deleteLivro } from "../services/LivroService";

const DescricaoLivro = ( props) => {

    const { livro, token, isAdmin } = props.route.params

    useEffect(() => {
        props.navigation.setOptions({ title: livro.titulo })
    }, [])

    return (
        <ScrollView style={ estilos.container }>
            <Text style={ estilos.label }>Título:</Text>
            <Text>{ livro.titulo }</Text>

            <View style={ estilos.espacamento } />

            <Text style={ estilos.label }>Descrição:</Text>
            <Text>{ livro.descricao }</Text>

            <View style={ estilos.espacamento } />

            <Text style={ estilos.label }>Autor:</Text>
            <Text>{ livro.autor }</Text>

            <View style={ estilos.espacamento } />

            <Text style={ estilos.label }>Editora:</Text>
            <Text>{ livro.editora }</Text>

            <View style={ estilos.espacamento } />

            <Text style={ estilos.label }>Páginas:</Text>
            <Text>{ livro.numeroPaginas }</Text>

            <View style={ estilos.espacamento } />

            { isAdmin && (
                <Button
                  icon={{
                    color : '#FFF',
                    name : 'trash',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => {
                      deleteLivro(token, livro.id)
                      .then(() => {
                          Alert.alert('Sucesso', 'Livro excluído com sucesso!')
                          props.navigation.goBack()

                      })
                      .catch(() => Alert.alert('Erro', 'Não foi possível excluir o livro!'))
                  }}
                  title='Excluir' />
            ) } 
 
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    container : {
      padding : 16
    },

    espacamento : {
      marginBottom : 8
    },
    label : {
        fontSize : 18, 
        fontWeight : 'bold' 
  }
})

export default DescricaoLivro