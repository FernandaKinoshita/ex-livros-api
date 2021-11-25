import React from 'react'
import { NavigationContainer  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CadastroLivro from './src/components/screens/CadastroLivro'
import DescricaoLivro from './src/components/screens/DescricaoLivro'
import Home from './src/components/screens/Home'
import Login from './src/components/screens/Login'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen
        component={ Login }
        name='login'/>

      <Stack.Screen
        component={ Home }
        name='home'
        options={{
          title : 'Livros'
        }}/>

      <Stack.Screen
        component={ CadastroLivro }
        name='cadastroLivro'
        options={{
          title : 'Formulário de Livros'
        }}/>

      <Stack.Screen 
        component= { DescricaoLivro }
        name='descricaoLivro'/>

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App