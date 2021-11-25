
import React, {
    useEffect,
    useState
    
} from 'react'

import {
    Alert,
    FlatList,
    RefreshControl,
    Text,
    View    
} from 'react-native'

import {
    SpeedDial,    
} from 'react-native-elements'


import LisItemLivro from '../../ListItemLivro'

import { getToken, removeToken } from '../database/DB'
import { getLivros } from '../services/LivroService'
import jwtDecode from 'jwt-decode'

const Home = ( props ) => {

    const [open, setOpen] = useState(false)
    const [livros, setLivros] = useState([])  
    const [token, setToken] = useState('') 
    const [isLoading, setIsLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const sair = () => {
        removeToken((error) => {
            if ( !error ) {
                props.navigation.reset({
                    index : 0,
                    routes : [{
                        name : 'login'
                    }]
                })
            }
        })
      } 

        const getLivrosFromAPI = (token) => {
          setIsLoading(true )
          getLivros(token)
            .then((response) => setLivros(response.data))
            .catch(() => Alert.alert('Erro', 'Não foi possível listar os livros!'))
            .finally(() =>setIsLoading(false))
        }    

        useEffect (() => {
          getToken((error, success) => {
            if ( !error && success && success.trim().length > 0) {
              const payload = jwtDecode(success)
              setIsAdmin(payload.admin)
              setToken(success)
              getLivrosFromAPI(success)
            } 
          })
        }, [])

    return (
        <View style={{ flex : 1, padding : 16 }}>

          { livros.length ===0 && (
            <Text style={{ textAlign : 'center' }}>
              Não há livros para serem exibidos
              </Text>
          )}
            
            <FlatList
            data={ livros }
            keyExtractor={ (item) => item.id }
            refreshControl={
              <RefreshControl
                onRefresh={() => getLivrosFromAPI(token)}
                refreshing={ isLoading } />
            }
            renderItem={ ({item}) => (
              <LisItemLivro 
                livro = { item } 
                onPress={ () => {              
                  props.navigation.navigate('descricaoLivro', { 
                    livro : item , 
                    token,
                    isAdmin
                     })
              }}/>  
            )}/> 

            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
                >

              { isAdmin && (
                <SpeedDial.Action
                icon={{ 
                    name: 'add', 
                    color: '#fff' 
              }}
                title="Add"
                onPress={() => {
                  setOpen(false)
                  props.navigation.navigate('cadastroLivro', { token })}                  
              }/>
              )}               

                <SpeedDial.Action
                    icon={{ 
                      name: 'sign-out-alt', 
                      color: '#fff',
                      type : 'font-awesome-5'
                    }}
                    title="Sair"
                    onPress={() => sair ()}
                />
            </SpeedDial>            
        </View>
    )
}

export default Home