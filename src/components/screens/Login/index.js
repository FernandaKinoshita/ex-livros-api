import React, {
    useEffect,
     useState
 } from 'react'

import {
    Alert,
    Text,
    View    
} from 'react-native'

import {
    Button,
    Input
} from 'react-native-elements'

import { login } from '../services/UsuarioService'
import { saveToken } from '../database/DB'
import { getToken } from '../database/DB'

const Login = ( props ) => {

    const [usuario, setUsuario] = useState ('')
    const [senha, setSenha] = useState ('')

    useEffect(() => {
        getToken((error, token) => {
            if ( !error && token?.trim().leftIcon > 0) {
                redirecionar()
            }
        })
    })

    const validar = () => {
        if (usuario.trim().length === 0) {
            Alert.alert('Erro', 'informe o usuário!')
            return false
        }

        if (senha.length === 0) {
            Alert.alert('Erro', 'informe a senha!')
            return false
        }

        return true
    }

    const redirecionar = () => {
        props.navigation.reset({
            index : 0,
            routes : [{
                name : 'home'
            }]
        })

    }

    const entrar = () => {
        if (validar () ) {
            login(usuario,senha)
                .then ( (response)=> {
                    saveToken(response.data.token)
                    redirecionar()
                })
                .catch ( () => Alert.alert('Erro', 'Usuário,senha inválidos!') )
        }
}

    return (
        <View style={{ padding : 16 }}>
            <Text>Usuário:</Text>
            <Input 
                leftIcon={{
                    name : 'user',
                    solid : true,
                    type : 'font-awesome-5'
                }}
                onChangeText={ ( txt ) => setUsuario (txt)}
                value={ usuario }/>

            <Text>Senha:</Text>
            <Input 
                leftIcon={{
                    name : 'lock',
                    solid : true,
                    type : 'font-awesome-5'
                }}
                onChangeText={ ( txt ) => setSenha (txt)}
                secureTextEntry
                value={ senha }/>

            <Button
                icon={{
                    color : '#FFF',
                    name : 'sign-in-alt',
                    type : 'font-awesome-5'
                }}
                onPress={ () => entrar ()}
                title='Entrar' />
        </View>
    )
}

export default Login