const axios = require ('axios')

const URL_Livros_API = 'http://10.0.2.2:3000/livros'

/**
 * Lista os livros via API
 * @param {string} jwt 
 * @returns {Promise}
 */

export const getLivros = (jwt) => {
    return axios ({
        url : URL_Livros_API,
        method : 'get',
        headers : {
            'Authorization' : 'Bearer ' + jwt

        }
    })
}

/**
 * Salva um livro via API
 * @param {string} jtw 
 * @param {string} titulo 
 * @param {string} descricao 
 * @param {string} autor 
 * @param {string} editora 
 * @param {int} numeroPaginas
 * @returns 
 */

export const postLivro = (jwt, titulo, descricao, autor, editora, numeroPaginas) => {
    return axios({
        url : URL_Livros_API,
        method : 'post',
        headers : {
            'Authorization' : 'Bearer ' + jwt
        },

        data : {
            titulo,
            descricao,
            autor,
            editora, 
            numeroPaginas
        }
    })

}

/**
 * Remove um livro via API
 * @param {string} jwt 
 * @param {int} id 
 * @returns {Promise}
 */
export const deleteLivro = (jwt, id) => {
    return axios ({
        url : URL_Livros_API + '/' + id,
        method : 'delete',
        headers : {
            'Authorization' : 'Bearer ' + jwt
        }
    })
}