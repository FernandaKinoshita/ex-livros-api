import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Salva um token no banco
 * @param {string} token 
 * @param {function} callback 
 */
export const saveToken = async (token, callback = null ) => {
    try {
        await AsyncStorage.setItem('token', token, callback)
    }catch (error) {
        throw new Error ('Não foi possível salvar o token')
    }
}


/**
 * Remove um token do banco
 * @param {function} callback 
 */
export const removeToken = async (callback = null) => {
    try {
        await AsyncStorage.removeItem('token', callback)        
    } catch (error) {
        throw new Error('Não foi possível apagar o token!')
        
    }
}


/**
 * Recupera um valor de token do banco
 * @param {function} callback 
 */
export const getToken = async (callback = null) => {
    try {
        await AsyncStorage.getItem('token', callback)
    } catch (error) {
        throw new Error('Não foi possível recuperar o token')
        
    }
}