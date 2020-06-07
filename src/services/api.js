import user from '../assets/user.json'

const api = {}

api.baseUrl = window.location.href.includes('localhost') ? 'http://localhost:8080' : 'api.goals.com'

api.authenticate = function (email, password) {
  return new Promise((resolve) => {
    localStorage.setItem('token', JSON.stringify({email, password}))
    resolve()
    // config.headers['Authorization'] = token // needed for all requests
    // maybe: axios.defaults.headers.common['Authorization'] = token
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

api.socialAuth = function (token) {
  return new Promise(async (resolve) => {
    // request to database with token
    localStorage.setItem('token', JSON.stringify(user))
    resolve()
      
  })
}

api.logout = function () {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  //delete axios.defaults.headers.common['Authorization']
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