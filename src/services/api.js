// import trae from 'trae'

// const url = window.location.href.includes('localhost')
//   ? 'http://localhost:8080' : 'https://platzi-jwt.now.sh'

// trae.baseUrl(url)

// trae.before((config) => {
//   const token = window.localStorage.token

//   if (token) {
//     config.headers['Authorization'] = token
//   }

//   return config
// })

// const api = {}

// api.authenticate = function (email, password) {
//   return trae.post('/auth', { email, password })
//     .then(res => res.data)
// }

// api.getStatus = function () {
//   return trae.get('/')
//     .then(res => res.data)
//     .catch(err => console.log('[ERROR]', err))
// }

// api.checkToken = function () {
//   return trae.get('/check')
//     .then(res => res.data)
// }

// export default api