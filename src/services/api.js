import userData from '../assets/user.json'

const api = {}

api.baseUrl = window.location.href.includes('localhost') ? 'http://localhost:8080' : 'api.goals.com'

api.authenticate = function (user) {
  return new Promise((resolve, reject) => {
    if (user.email !== 'tgarciamiranda@gmail.com') {
      reject('Usuario y/o contraseña incorrecta')
    } else {
      user.name = userData.name
      localStorage.setItem('token', JSON.stringify(user))
      resolve()
    }
    //  axios({ url: `${baseUrl}/auth`, { email, password }, method: 'POST' })
    //   .then(res => {
    //     localStorage.setItem('token', res.data.token)
    //     localStorage.setItem('user', window.atob(res.data.token.split('.')[1]))
    //     resolve(res)
    //   })
    //   .catch(err => { 
    //     reject(err)
    //     localStorage.removeItem('token')
    //   })
  })
}

api.register = function (user) {
  return new Promise((resolve) => {
    localStorage.setItem('token', JSON.stringify(user))
    resolve()
  })
}

api.socialAuth = function (token) {
  return new Promise(async (resolve) => {
    console.log(token)
    // request to database with token
    localStorage.setItem('token', JSON.stringify(userData))
    resolve()
      
  })
}

api.logout = function () {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  //delete axios.defaults.headers.common['Authorization']
}

api.forgetPassword = function (email) {
  return new Promise(async (resolve, reject) => {
    if (email !== 'tgarciamiranda@gmail.com') {
      reject('El correo ingresado no está asociado con ninguna cuenta')
    } else {
      resolve('¡Listo! Las instrucciones para reestablecer la contraseña fueron enviadas a la cuenta ingresada')
      resolve()
    }
  })
}

// api.getStatus = function () {
//   return trae.get('${baseUrl}/')
//     .then(res => res.data)
//     .catch(err => console.log('[ERROR]', err))
// }

// api.checkToken = function () {
//   return trae.get('/check')
//     .then(res => res.data)
// }

export default api