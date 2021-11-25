const axios = require('axios')

/**
 * Realiza o login via API
 * @param {string} usuario 
 * @param {string} senha 
 * @returns  {Promise}
 */
export const login = async (usuario,senha) => {
    return axios ({
        url : 'http://10.0.2.2:3000/login',
        method : 'post',
        data : {usuario,senha}
    })
}