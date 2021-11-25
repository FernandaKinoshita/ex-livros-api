import React from "react";

import {
    Image,
    Text, 
    TouchableOpacity,
    View
} from 'react-native'

import icon from './icon.png'
 
const LisItemLivro = (props) => {
    return (
        <TouchableOpacity
        onPress={() => typeof props.onPress === 'function' ? props.onPress() : {}} 
        style={{ 
            borderBottomColor : '#000',
            borderBottomWidth : 2,
            flexDirection : 'row', 
            padding : 16 }}>

            <Image
            source={ icon }
            style={{ height : 60, marginRight : 8, width : 40 }} />

            <View>
                <Text style={{ fontSize : 18, fontWeight : 'bold' }}>
                    { props.livro.titulo }
                </Text>

                <Text>
                    { props.livro.descricao}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default LisItemLivro